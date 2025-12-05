import { Router } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import prisma from '../db';
import { broadcast } from '../websocket';

const router = Router();

// Get all teams
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        members: {
          select: {
            id: true,
            login: true,
            name: true,
            avatar: true,
            roles: true
          }
        },
        _count: {
          select: {
            members: true
          }
        }
      },
      orderBy: {
        teamXP: 'desc'
      }
    });

    res.json({
      success: true,
      data: teams
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create team
router.post('/', protect, async (req: AuthRequest, res) => {
  try {
    const { name, description, settings } = req.body;

    // Check if user is already in a team
    if (req.user.teamId) {
      return res.status(400).json({
        success: false,
        error: 'You are already in a team'
      });
    }

    const team = await prisma.team.create({
      data: {
        name,
        description,
        settings: settings || undefined,
        members: {
          connect: { id: req.user.id }
        }
      },
      include: {
        members: true
      }
    });

    // Update user role to CAPTAIN
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        roles: ['CAPTAIN', 'DEVELOPER']
      }
    });

    // Create event log
    await prisma.eventLog.create({
      data: {
        type: 'TEAM_JOINED',
        userId: req.user.id,
        teamId: team.id,
        payload: {
          teamName: team.name,
          role: 'CAPTAIN'
        }
      }
    });

    broadcast({ type: 'TEAM_CREATED', data: team });

    res.status(201).json({
      success: true,
      data: team
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get team by ID
router.get('/:id', protect, async (req: AuthRequest, res) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: req.params.id },
      include: {
        members: {
          select: {
            id: true,
            login: true,
            name: true,
            avatar: true,
            roles: true,
            xpTotal: true,
            league: true
          }
        },
        submissions: {
          include: {
            mission: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: {
            timestamp: 'desc'
          },
          take: 10
        },
        teamBadges: {
          include: {
            badge: true
          }
        }
      }
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        error: 'Team not found'
      });
    }

    res.json({
      success: true,
      data: team
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Join team with invite code
router.post('/:id/join', protect, async (req: AuthRequest, res) => {
  try {
    const { inviteCode } = req.body;

    if (req.user.teamId) {
      return res.status(400).json({
        success: false,
        error: 'You are already in a team'
      });
    }

    const team = await prisma.team.findFirst({
      where: {
        id: req.params.id,
        inviteCode
      }
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        error: 'Invalid invite code'
      });
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        teamId: team.id
      }
    });

    // Create event log
    await prisma.eventLog.create({
      data: {
        type: 'TEAM_JOINED',
        userId: req.user.id,
        teamId: team.id,
        payload: {
          teamName: team.name,
          userName: req.user.name
        }
      }
    });

    broadcast({ type: 'TEAM_MEMBER_JOINED', data: { teamId: team.id, user: req.user } });

    res.json({
      success: true,
      data: team
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update team member roles (captain only)
router.post('/:id/roles', protect, async (req: AuthRequest, res) => {
  try {
    const { userId, roles } = req.body;

    if (!req.user.roles.includes('CAPTAIN')) {
      return res.status(403).json({
        success: false,
        error: 'Only team captain can update roles'
      });
    }

    if (!req.user.teamId || req.user.teamId !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized for this team'
      });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { roles }
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

export default router;
