import express from 'express';
import Note from '../models/Note.js';
import { hashDeleteToken, validateDeleteToken } from '../utils/crypto.js';

const router = express.Router();

// Input validation helper
const sanitizeNoteName = (name) => {
  if (!name || typeof name !== 'string') return null;
  // Only allow alphanumeric and hyphens, max 100 chars
  const sanitized = name.toLowerCase().replace(/[^a-z0-9-]/g, '').substring(0, 100);
  return sanitized.length > 0 ? sanitized : null;
};

/**
 * GET /api/note/:name
 * Check if a note exists and return its encrypted data
 */
router.get('/note/:name', async (req, res) => {
  try {
    const name = sanitizeNoteName(req.params.name);
    
    if (!name) {
      return res.status(400).json({ error: 'Invalid note name' });
    }

    const note = await Note.findById(name);
    
    if (!note) {
      return res.json({ exists: false });
    }

    return res.json({
      exists: true,
      data: note.data,
      hasUserPassword: note.hasUserPassword || false,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    });
  } catch (error) {
    console.error('Error fetching note:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /api/note/:name
 * Create or update a note with encrypted data
 */
router.post('/note/:name', async (req, res) => {
  try {
    const name = sanitizeNoteName(req.params.name);
    const { data, deleteTokenHash, hasUserPassword } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Invalid note name' });
    }

    // Validate encrypted data structure
    if (!data || !data.salt || !data.iv || !data.ciphertext) {
      return res.status(400).json({ error: 'Invalid encrypted data' });
    }

    // Validate ciphertext size (5MB max)
    if (data.ciphertext.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'Note too large (max 5MB)' });
    }

    // Check if note exists
    const existingNote = await Note.findById(name);

    if (existingNote) {
      // Update existing note
      existingNote.data = data;
      if (typeof hasUserPassword === 'boolean') {
        existingNote.hasUserPassword = hasUserPassword;
      }
      await existingNote.save();

      return res.json({
        success: true,
        message: 'Note updated',
        updatedAt: existingNote.updatedAt
      });
    } else {
      // Create new note
      if (!deleteTokenHash) {
        return res.status(400).json({ error: 'Delete token hash required for new notes' });
      }

      const newNote = new Note({
        _id: name,
        data,
        deleteTokenHash,
        hasUserPassword: hasUserPassword || false
      });

      await newNote.save();

      return res.json({
        success: true,
        message: 'Note created',
        createdAt: newNote.createdAt,
        updatedAt: newNote.updatedAt
      });
    }
  } catch (error) {
    console.error('Error saving note:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * DELETE /api/note/:name
 * Delete a note if the delete token is valid
 */
router.delete('/note/:name', async (req, res) => {
  try {
    const name = sanitizeNoteName(req.params.name);
    const { deleteToken } = req.body;

    if (!name || !deleteToken) {
      return res.status(400).json({ error: 'Note name and delete token required' });
    }

    const note = await Note.findById(name);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Validate delete token with timing-safe comparison
    const isValid = validateDeleteToken(deleteToken, note.deleteTokenHash);

    if (!isValid) {
      return res.status(403).json({ error: 'Invalid delete token' });
    }

    // Delete the note
    await Note.findByIdAndDelete(name);

    return res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /api/admin/:adminId
 * Get all notes metadata (no sensitive data) if admin ID is correct
 */
router.get('/admin/:adminId', async (req, res) => {
  try {
    const { adminId } = req.params;
    const adminSecret = process.env.ADMIN_SECRET;
    
    // Check if admin secret is configured
    if (!adminSecret) {
      return res.status(500).json({ error: 'Admin not configured' });
    }
    
    // Check if the admin ID is correct
    if (adminId !== adminSecret) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Fetch all notes from the database (only metadata, no passwords)
    const notes = await Note.find({}).select('_id hasUserPassword createdAt updatedAt data');
    
    // Format the response - NO passwords or tokens exposed
    const users = notes.map(note => ({
      id: note._id,
      hasUserPassword: note.hasUserPassword,
      encryptedData: note.data, // Still encrypted, admin can try to decrypt if they know password
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    }));

    return res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * DELETE /api/admin/:adminId/delete/:noteId
 * Delete a specific note as admin
 */
router.delete('/admin/:adminId/delete/:noteId', async (req, res) => {
  try {
    const { adminId, noteId } = req.params;
    const adminSecret = process.env.ADMIN_SECRET;
    
    if (!adminSecret) {
      return res.status(500).json({ error: 'Admin not configured' });
    }
    
    if (adminId !== adminSecret) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const name = sanitizeNoteName(noteId);
    if (!name) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    const deletedNote = await Note.findByIdAndDelete(name);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.json({
      success: true,
      message: `Note ${name} deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting note as admin:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
