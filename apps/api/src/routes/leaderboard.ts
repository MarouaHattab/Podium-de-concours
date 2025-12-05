import { Router } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import prisma from '../db';

const router = Router();

// Get leaderboard
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    const { league, limit = '50' } = req.query;

    const where: any = {};
    if (league) {
      where.league = league;
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        login: true,
        name: true,
        avatar: true,
        teamId: true,
        team: {
          select: {
            id: true,
            name: true
          }
        },
        xpTotal: true,
        league: true,
        userBadges: {
          select: {
            badgeId: true
          }
        }
      },
      orderBy: {
        xpTotal: 'desc'
      },
      take: parseInt(limit as string)
    });

    const leaderboard = users.map((user, index) => ({
      userId: user.id,
      userName: user.name,
      avatar: user.avatar,
      teamId: user.teamId,
      teamName: user.team?.name,
      points: user.xpTotal,
      momentumScore: 0, // TODO: calculate momentum
      xpTotal: user.xpTotal,
      league: user.league,
      badgesCount: user.userBadges.length,
      trend: 'SAME' as const,
      rank: index + 1
    }));

    res.json({
      success: true,
      data: leaderboard
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get team leaderboard
router.get('/teams', protect, async (req: AuthRequest, res) => {
  try {
    const { limit = '50' } = req.query;

    const teams = await prisma.team.findMany({
      include: {
        members: {
          select: {
            xpTotal: true,
            streak: true,
          }
        }
      }
    });

    const teamLeaderboard = teams
      .map((team) => {
        const totalXP = team.members.reduce((sum, member) => sum + member.xpTotal, 0);
        const avgStreak = team.members.length > 0 
          ? Math.floor(team.members.reduce((sum, member) => sum + member.streak, 0) / team.members.length)
          : 0;
        
        return {
          teamId: team.id,
          teamName: team.name,
          memberCount: team.members.length,
          xpTotal: totalXP,
          streak: avgStreak,
          trend: 'UP' as const,
          league: totalXP > 50000 ? 'DIAMOND' : totalXP > 25000 ? 'GOLD' : totalXP > 10000 ? 'SILVER' : 'BRONZE'
        };
      })
      .filter(team => team.memberCount > 0) // Only teams with members
      .sort((a, b) => b.xpTotal - a.xpTotal)
      .slice(0, parseInt(limit as string))
      .map((team, index) => ({
        ...team,
        rank: index + 1
      }));

    res.json({
      success: true,
      data: teamLeaderboard
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
