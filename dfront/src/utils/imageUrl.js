export const getBackendImageUrl = (src) => {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  let clean = src;
  if (clean.startsWith('/')) {
    clean = clean.slice(1);
  }
  if (clean.startsWith('images/')) {
    clean = clean.slice('images/'.length);
  }
  return `http://127.0.0.1:8000/images/${clean}`;
};
