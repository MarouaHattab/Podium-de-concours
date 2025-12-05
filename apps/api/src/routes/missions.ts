import { Router } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import prisma from '../db';
import { broadcast } from '../websocket';

const router = Router();

// Get all missions
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    const { domain, status } = req.query;

    const where: any = {};
    if (domain) where.categoryNIRD = domain;
    if (status) where.status = status;

    const missions = await prisma.mission.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: missions
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get team submissions
router.get('/submissions', protect, async (req: AuthRequest, res) => {
  try {
    if (!req.user.teamId) {
      return res.status(400).json({
        success: false,
        error: 'You must be in a team'
      });
    }

    const submissions = await prisma.submission.findMany({
      where: {
        teamId: req.user.teamId
      },
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
      }
    });

    res.json({
      success: true,
      data: submissions
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Submit mission
router.post('/submissions', protect, async (req: AuthRequest, res) => {
  try {
    const { missionId, repositoryUrl } = req.body;

    if (!req.user.teamId) {
      return res.status(400).json({
        success: false,
        error: 'You must be in a team to submit missions'
      });
    }

    const mission = await prisma.mission.findUnique({
      where: { id: missionId }
    });

    if (!mission) {
      return res.status(404).json({
        success: false,
        error: 'Mission not found'
      });
    }

    const submission = await prisma.submission.create({
      data: {
        teamId: req.user.teamId,
        missionId,
        userId: req.user.id,
        repositoryUrl,
        status: 'PENDING'
      },
      include: {
        mission: true,
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // Create event log
    await prisma.eventLog.create({
      data: {
        type: 'MISSION_SUBMITTED',
        userId: req.user.id,
        teamId: req.user.teamId,
        payload: {
          missionId,
          missionTitle: mission.title,
          submissionId: submission.id
        }
      }
    });

    broadcast({ type: 'MISSION_SUBMITTED', data: submission });

    res.status(201).json({
      success: true,
      data: submission
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Verify submission (verifier/mentor only)
router.post('/submissions/:id/verify', protect, async (req: AuthRequest, res) => {
  try {
    const { status, notes } = req.body;

    if (!req.user.roles.includes('VERIFIER') && !req.user.roles.includes('CAPTAIN')) {
      return res.status(403).json({
        success: false,
        error: 'Only verifiers can verify submissions'
      });
    }

    const submission = await prisma.submission.findUnique({
      where: { id: req.params.id },
      include: {
        mission: true,
        team: true
      }
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    const updatedSubmission = await prisma.submission.update({
      where: { id: req.params.id },
      data: {
        status,
        verifierId: req.user.id,
        verifierNotes: notes,
        verifiedAt: new Date()
      }
    });

    // If approved, award points and XP
    if (status === 'APPROVED') {
      await prisma.team.update({
        where: { id: submission.teamId },
        data: {
          totalPoints: {
            increment: submission.mission.points
          },
          teamXP: {
            increment: submission.mission.xpReward
          }
        }
      });

      await prisma.user.update({
        where: { id: submission.userId },
        data: {
          xpTotal: {
            increment: submission.mission.xpReward
          },
          gems: {
            increment: submission.mission.gemsReward
          }
        }
      });

      // Update domain progress
      await prisma.domainProgress.upsert({
        where: {
          userId_domain: {
            userId: submission.userId,
            domain: submission.mission.categoryNIRD
          }
        },
        update: {
          xp: {
            increment: submission.mission.xpReward
          },
          missionsCompleted: {
            increment: 1
          }
        },
        create: {
          userId: submission.userId,
          domain: submission.mission.categoryNIRD,
          xp: submission.mission.xpReward,
          missionsCompleted: 1
        }
      });

      // Create event log
      await prisma.eventLog.create({
        data: {
          type: 'MISSION_VERIFIED',
          userId: submission.userId,
          teamId: submission.teamId,
          payload: {
            missionTitle: submission.mission.title,
            xpEarned: submission.mission.xpReward,
            gemsEarned: submission.mission.gemsReward
          }
        }
      });

      broadcast({ type: 'MISSION_VERIFIED', data: updatedSubmission });
    }

    res.json({
      success: true,
      data: updatedSubmission
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
