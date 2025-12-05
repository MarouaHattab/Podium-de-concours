import { Router } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import prisma from '../db';

const router = Router();

// Get current user (me)
router.get('/me', protect, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        team: true,
        domainProgress: true,
        userBadges: {
          include: {
            badge: true
          }
        },
        activeBoosters: true
      }
    });

    res.json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update accessibility preferences
router.patch('/me/accessibility', protect, async (req: AuthRequest, res) => {
  try {
    const { accessibilityPrefs } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        accessibilityPrefs
      }
    });

    res.json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get following/followers for a user
router.get('/:userId/follow-stats', async (req, res) => {
  try {
    const { userId } = req.params;

    const [followingCount, followersCount, following, followers] = await Promise.all([
      prisma.follow.count({ where: { followerId: userId } }),
      prisma.follow.count({ where: { followingId: userId } }),
      prisma.follow.findMany({
        where: { followerId: userId },
        include: {
          following: {
            select: {
              id: true,
              name: true,
              login: true,
              avatar: true,
              xpTotal: true,
            }
          }
        }
      }),
      prisma.follow.findMany({
        where: { followingId: userId },
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              login: true,
              avatar: true,
              xpTotal: true,
            }
          }
        }
      }),
    ]);

    res.json({
      success: true,
      data: {
        followingCount,
        followersCount,
        following: following.map(f => f.following),
        followers: followers.map(f => f.follower),
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Check if current user follows another user
router.get('/:userId/is-following/:targetUserId', protect, async (req: AuthRequest, res) => {
  try {
    const { userId, targetUserId } = req.params;

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId,
        }
      }
    });

    res.json({
      success: true,
      data: { isFollowing: !!follow }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Follow a user
router.post('/:userId/follow', protect, async (req: AuthRequest, res) => {
  try {
    const currentUserId = req.user.id;
    const { userId: targetUserId } = req.params;

    if (currentUserId === targetUserId) {
      return res.status(400).json({
        success: false,
        error: 'Cannot follow yourself'
      });
    }

    // Check if already following
    const existing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        }
      }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Already following this user'
      });
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId,
      }
    });

    res.json({
      success: true,
      data: follow
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Unfollow a user
router.delete('/:userId/follow', protect, async (req: AuthRequest, res) => {
  try {
    const currentUserId = req.user.id;
    const { userId: targetUserId } = req.params;

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        }
      }
    });

    if (!follow) {
      return res.status(404).json({
        success: false,
        error: 'Not following this user'
      });
    }

    await prisma.follow.delete({
      where: {
        id: follow.id
      }
    });

    res.json({
      success: true,
      message: 'Unfollowed successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
