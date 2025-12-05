import { Router } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import prisma from '../db';

const router = Router();

// Get store items
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    const items = await prisma.storeItem.findMany({
      where: {
        available: true
      }
    });

    res.json({
      success: true,
      data: items
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Purchase item
router.post('/purchase', protect, async (req: AuthRequest, res) => {
  try {
    const { itemId } = req.body;

    const item = await prisma.storeItem.findUnique({
      where: { id: itemId }
    });

    if (!item || !item.available) {
      return res.status(404).json({
        success: false,
        error: 'Item not available'
      });
    }

    if (req.user.gems < item.costGems) {
      return res.status(400).json({
        success: false,
        error: 'Not enough gems'
      });
    }

    // Deduct gems
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        gems: req.user.gems - item.costGems
      }
    });

    // Apply effect based on item type
    if (item.type === 'RESTORE_HEART') {
      const maxHearts = parseInt(process.env.MAX_HEARTS || '5');
      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          hearts: maxHearts
        }
      });
    } else if (item.type === 'BOOST_XP') {
      // Create active booster
      await prisma.activeBooster.create({
        data: {
          userId: req.user.id,
          type: item.type,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        }
      });
    }

    res.json({
      success: true,
      message: 'Item purchased successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
