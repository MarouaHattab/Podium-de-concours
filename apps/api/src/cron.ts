import cron from 'node-cron';
import prisma from './db';

export const startCronJobs = () => {
  // Daily heart regeneration at midnight
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily heart regeneration...');
    
    const maxHearts = parseInt(process.env.MAX_HEARTS || '5');
    
    await prisma.user.updateMany({
      data: {
        hearts: maxHearts
      }
    });

    console.log('Daily hearts regenerated');
  });

  // Check and update streaks every day at 1 AM
  cron.schedule('0 1 * * *', async () => {
    console.log('Checking streaks...');
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const usersWithActivity = await prisma.lessonAttempt.findMany({
      where: {
        timestamp: {
          gte: yesterday
        },
        result: 'PASS'
      },
      select: {
        userId: true
      },
      distinct: ['userId']
    });

    const activeUserIds = new Set(usersWithActivity.map(u => u.userId));

    // Increment streak for active users
    await prisma.user.updateMany({
      where: {
        id: {
          in: Array.from(activeUserIds)
        }
      },
      data: {
        streak: {
          increment: 1
        },
        lastActiveDate: new Date()
      }
    });

    // Reset streak for inactive users
    await prisma.user.updateMany({
      where: {
        id: {
          notIn: Array.from(activeUserIds)
        },
        lastActiveDate: {
          lt: yesterday
        }
      },
      data: {
        streak: 0
      }
    });

    console.log('Streaks updated');
  });

  // Weekly league settlement (Sunday at 23:00)
  cron.schedule('0 23 * * 0', async () => {
    console.log('Running weekly league settlement...');
    
    // TODO: Implement league promotion/demotion logic
    
    console.log('Weekly league settlement completed');
  });

  // Clean up expired boosters every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Cleaning up expired boosters...');
    
    await prisma.activeBooster.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });

    console.log('Expired boosters cleaned');
  });

  // Deactivate expired flash quests every 10 minutes
  cron.schedule('*/10 * * * *', async () => {
    await prisma.flashQuest.updateMany({
      where: {
        active: true,
        endsAt: {
          lt: new Date()
        }
      },
      data: {
        active: false
      }
    });
  });

  console.log('All cron jobs scheduled');
};
