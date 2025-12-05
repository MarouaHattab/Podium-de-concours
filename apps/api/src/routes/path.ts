import { Router } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import prisma from '../db';

const router = Router();

// Get full path with units and lessons
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    const units = await prisma.unit.findMany({
      orderBy: {
        order: 'asc'
      },
      include: {
        lessons: {
          orderBy: {
            order: 'asc'
          }
        },
        requiredUnit: true
      }
    });

    // Get user's completed lessons
    const completedLessons = await prisma.lessonAttempt.findMany({
      where: {
        userId: req.user.id,
        result: 'PASS'
      },
      select: {
        lessonId: true
      }
    });

    const completedLessonIds = new Set(completedLessons.map(l => l.lessonId));

    // Enrich units with completion status
    const enrichedUnits = units.map(unit => ({
      ...unit,
      lessons: unit.lessons.map(lesson => ({
        ...lesson,
        completed: completedLessonIds.has(lesson.id)
      })),
      completed: unit.lessons.every(lesson => completedLessonIds.has(lesson.id))
    }));

    res.json({
      success: true,
      data: enrichedUnits
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get unit by ID
router.get('/units/:id', protect, async (req: AuthRequest, res) => {
  try {
    const unit = await prisma.unit.findUnique({
      where: { id: req.params.id },
      include: {
        lessons: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!unit) {
      return res.status(404).json({
        success: false,
        error: 'Unit not found'
      });
    }

    res.json({
      success: true,
      data: unit
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start a lesson
router.post('/lessons/:id/start', protect, async (req: AuthRequest, res) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id }
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found'
      });
    }

    // Check if user has enough hearts
    if (req.user.hearts < lesson.heartCost) {
      return res.status(400).json({
        success: false,
        error: 'Not enough hearts'
      });
    }

    res.json({
      success: true,
      data: lesson
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Submit lesson attempt
router.post('/lessons/:id/submit', protect, async (req: AuthRequest, res) => {
  try {
    const { answers, errorsCount } = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
      include: {
        unit: true
      }
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found'
      });
    }

    const passed = errorsCount === 0;
    const heartsUsed = passed ? 0 : Math.min(errorsCount, req.user.hearts);
    const xpEarned = passed ? lesson.xpReward : 0;

    // Create attempt record
    const attempt = await prisma.lessonAttempt.create({
      data: {
        userId: req.user.id,
        lessonId: lesson.id,
        result: passed ? 'PASS' : 'FAIL',
        errorsCount,
        xpEarned,
        heartsUsed,
        answers
      }
    });

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        hearts: Math.max(0, req.user.hearts - heartsUsed),
        xpTotal: passed ? req.user.xpTotal + xpEarned : req.user.xpTotal
      }
    });

    // Update domain progress if passed
    if (passed) {
      await prisma.domainProgress.upsert({
        where: {
          userId_domain: {
            userId: req.user.id,
            domain: lesson.unit.domain
          }
        },
        update: {
          xp: {
            increment: xpEarned
          },
          lessonsCompleted: {
            increment: 1
          }
        },
        create: {
          userId: req.user.id,
          domain: lesson.unit.domain,
          xp: xpEarned,
          lessonsCompleted: 1
        }
      });

      // Create event log
      await prisma.eventLog.create({
        data: {
          type: 'LESSON_COMPLETED',
          userId: req.user.id,
          payload: {
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            xpEarned,
            domain: lesson.unit.domain
          }
        }
      });
    }

    res.json({
      success: true,
      data: {
        attempt,
        passed,
        xpEarned,
        heartsUsed,
        user: {
          hearts: updatedUser.hearts,
          xpTotal: updatedUser.xpTotal
        }
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
