import { Router } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import prisma from '../db';

const router = Router();

// Get user progress
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    const domainProgress = await prisma.domainProgress.findMany({
      where: { userId: req.user.id }
    });

    const userBadges = await prisma.userBadge.findMany({
      where: { userId: req.user.id },
      include: {
        badge: true
      }
    });

    const activeBoosters = await prisma.activeBooster.findMany({
      where: {
        userId: req.user.id,
        expiresAt: {
          gt: new Date()
        }
      }
    });

    res.json({
      success: true,
      data: {
        userId: req.user.id,
        hearts: req.user.hearts,
        streak: req.user.streak,
        xpTotal: req.user.xpTotal,
        gems: req.user.gems,
        league: req.user.league,
        domains: domainProgress,
        badges: userBadges.map(ub => ub.badge),
        activeBoosters
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Restore one heart (costs gems or daily refresh)
router.post('/restore-heart', protect, async (req: AuthRequest, res) => {
  try {
    const HEART_COST_GEMS = 10;
    const maxHearts = parseInt(process.env.MAX_HEARTS || '5');

    if (req.user.hearts >= maxHearts) {
      return res.status(400).json({
        success: false,
        error: 'Hearts already full'
      });
    }

    if (req.user.gems < HEART_COST_GEMS) {
      return res.status(400).json({
        success: false,
        error: 'Not enough gems'
      });
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        hearts: Math.min(req.user.hearts + 1, maxHearts),
        gems: req.user.gems - HEART_COST_GEMS
      }
    });

    res.json({
      success: true,
      data: {
        hearts: user.hearts,
        gems: user.gems
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
