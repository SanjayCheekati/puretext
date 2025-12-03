const API_URL = import.meta.env.PROD 
  ? 'https://puretext-backend.vercel.app/api'
  : 'http://localhost:5000/api';

export const fetchNote = async (name) => {
  const response = await fetch(`${API_URL}/note/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }
  return response.json();
};

export const saveNote = async (name, data, deleteTokenHash, deleteToken, encryptionPassword) => {
  const body = { data };
  if (deleteTokenHash) {
    body.deleteTokenHash = deleteTokenHash;
  }
  if (deleteToken) {
    body.deleteToken = deleteToken;
  }
  if (encryptionPassword) {
    body.encryptionPassword = encryptionPassword;
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
