import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// POST /api/feedback — submit feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, type, message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message too long (max 2000 characters)' });
    }

    const feedback = new Feedback({
      name: name?.trim().slice(0, 100) || 'Anonymous',
      email: email?.trim().slice(0, 200) || '',
      type: ['feature', 'bug', 'improvement', 'other', 'newsletter'].includes(type) ? type : 'feature',
      message: message.trim()
    });

    await feedback.save();

    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

export default router;
