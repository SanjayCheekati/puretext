const API_URL = import.meta.env.PROD 
  ? 'https://puretext-backend.vercel.app/api'
  : 'http://localhost:5000/api';

export const submitFeedback = async ({ name, email, type, message }) => {
  const response = await fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, type, message })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to submit feedback');
  }

  return response.json();
};
