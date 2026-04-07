export const sanitizeNoteName = (name) => {
  if (!name || typeof name !== 'string') return '';
  return name.toLowerCase().replace(/[^a-z0-9-]/g, '').substring(0, 100);
};
