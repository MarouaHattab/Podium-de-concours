import { Router } from 'express';
import prisma from '../db';
import { broadcast } from '../websocket';

const router = Router();

// CI webhook endpoint
router.post('/ci', async (req, res) => {
  try {
    const { submissionId, ciRunId, status, result } = req.body;

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        mission: true
      }
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    // Update submission with CI result
    const updated = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        ciRunId,
        ciResult: result,
        status: status === 'passed' ? 'APPROVED' : 'REJECTED'
      }
    });

    // Notify via WebSocket
    broadcast({ 
      type: 'CI_RESULT', 
      data: { submissionId, status, result }
    });

    res.json({
      success: true,
      data: updated
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
