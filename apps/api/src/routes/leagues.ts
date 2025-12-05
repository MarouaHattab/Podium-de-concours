import { Router } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import prisma from '../db';

const router = Router();

// Get leagues info
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    const leagues = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'RESILIENCE'];
    
    const leagueData = await Promise.all(
      leagues.map(async (league) => {
        const count = await prisma.user.count({
          where: { league: league as any }
        });

        const topUsers = await prisma.user.findMany({
          where: { league: league as any },
          select: {
            id: true,
            name: true,
            avatar: true,
            xpTotal: true
          },
          orderBy: {
            xpTotal: 'desc'
          },
          take: 10
        });

        return {
          league,
          userCount: count,
          topUsers
        };
      })
    );

    res.json({
      success: true,
      data: leagueData
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Settle weekly leagues (admin/cron only)
router.post('/settle-week', protect, async (req: AuthRequest, res) => {
  try {
    // TODO: Implement league settlement logic
    // - Promote top performers
    // - Demote bottom performers
    // - Create snapshot
    // - Send notifications

    res.json({
      success: true,
      message: 'Weekly league settlement not fully implemented'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
