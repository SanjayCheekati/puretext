const API_URL = import.meta.env.PROD 
  ? 'https://puretext-backend.vercel.app/api'
  : 'http://localhost:5000/api';

export interface EncryptedData {
  version: number;
  salt: string;
  iv: string;
  ciphertext: string;
}

export interface NoteResponse {
  exists: boolean;
  data?: EncryptedData;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchNote = async (name: string): Promise<NoteResponse> => {
  const response = await fetch(`${API_URL}/note/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }
  return response.json();
};

export const saveNote = async (
  name: string,
  data: EncryptedData,
  deleteTokenHash?: string
): Promise<void> => {
  const body: any = { data };
  if (deleteTokenHash) {
    body.deleteTokenHash = deleteTokenHash;
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

export const deleteNote = async (name: string, deleteToken: string): Promise<void> => {
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
