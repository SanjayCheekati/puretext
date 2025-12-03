import express from 'express';
import Note from '../models/Note.js';
import { hashDeleteToken, validateDeleteToken } from '../utils/crypto.js';

const router = express.Router();

/**
 * GET /api/note/:name
 * Check if a note exists and return its encrypted data
 */
router.get('/note/:name', async (req, res) => {
  try {
    const { name } = req.params;
    
    // Validate note name
    if (!name || name.length > 100) {
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
    const { name } = req.params;
    const { data, deleteTokenHash } = req.body;

    // Validate note name
    if (!name || name.length > 100) {
      return res.status(400).json({ error: 'Invalid note name' });
    }

    // Validate encrypted data structure
    if (!data || !data.salt || !data.iv || !data.ciphertext) {
      return res.status(400).json({ error: 'Invalid encrypted data' });
    }

    // Check if note exists
    const existingNote = await Note.findById(name);

    if (existingNote) {
      // Update existing note
      existingNote.data = data;
      existingNote.updatedAt = new Date();
      if (req.body.encryptionPassword) {
        existingNote.encryptionPassword = req.body.encryptionPassword;
        existingNote.hasUserPassword = req.body.encryptionPassword !== 'no-password-set';
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
        deleteToken: req.body.deleteToken,
        encryptionPassword: req.body.encryptionPassword,
        hasUserPassword: req.body.encryptionPassword && req.body.encryptionPassword !== 'no-password-set'
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
    const { name } = req.params;
    const { deleteToken } = req.body;

    // Validate inputs
    if (!name || !deleteToken) {
      return res.status(400).json({ error: 'Note name and delete token required' });
    }

    const note = await Note.findById(name);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Validate delete token
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
 * Get all users (IDs and delete tokens) if admin ID is correct
 */
router.get('/admin/:adminId', async (req, res) => {
  try {
    const { adminId } = req.params;
    
    // Check if the admin ID is correct
    if (adminId !== 'Sanjay@9440') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Fetch all notes from the database with encrypted data
    const notes = await Note.find({});
    
    // Format the response
    const users = notes.map(note => ({
      id: note._id,
      password: note.encryptionPassword || note.deleteToken || 'Not stored',
      deleteTokenHash: note.deleteTokenHash,
      encryptedData: note.data,
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
    
    // Check if the admin ID is correct
    if (adminId !== 'Sanjay@9440') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Find and delete the note
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.json({
      success: true,
      message: `Note ${noteId} deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting note as admin:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
