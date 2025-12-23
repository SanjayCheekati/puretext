const API_URL = import.meta.env.PROD 
  ? 'https://puretext-backend.vercel.app/api'
  : 'http://localhost:5000/api';

// Simple in-memory cache for note metadata
const noteCache = new Map();
const CACHE_TTL = 30000; // 30 seconds

const getCachedNote = (name) => {
  const cached = noteCache.get(name);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  noteCache.delete(name);
  return null;
};

const setCachedNote = (name, data) => {
  noteCache.set(name, { data, timestamp: Date.now() });
};

export const invalidateNoteCache = (name) => {
  noteCache.delete(name);
};

export const fetchNote = async (name, forceRefresh = false) => {
  // Check cache first (unless force refresh)
  if (!forceRefresh) {
    const cached = getCachedNote(name);
    if (cached) {
      return cached;
    }
  }

  const response = await fetch(`${API_URL}/note/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }
  const data = await response.json();
  
  // Cache the response
  setCachedNote(name, data);
  
  return data;
};

export const saveNote = async (name, data, deleteTokenHash, deleteToken, hasUserPassword) => {
  const body = { data };
  if (deleteTokenHash) {
    body.deleteTokenHash = deleteTokenHash;
  }
  // Note: We no longer send deleteToken or passwords to the server
  // Only send whether user has set a password (boolean)
  if (typeof hasUserPassword === 'boolean') {
    body.hasUserPassword = hasUserPassword;
  }

  const response = await fetch(`${API_URL}/note/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to save note');
  }
};

export const deleteNote = async (name, deleteToken) => {
  const response = await fetch(`${API_URL}/note/${name}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deleteToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
};

export const fetchAllUsers = async (adminId) => {
  const response = await fetch(`${API_URL}/admin/${adminId}`);
  if (!response.ok) {
    throw new Error('Unauthorized or failed to fetch admin data');
  }
  return response.json();
};

export const deleteNoteAsAdmin = async (adminId, noteId) => {
  const response = await fetch(`${API_URL}/admin/${adminId}/delete/${noteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
  return response.json();
};
