function normalizeText(value = '') {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function buildSearchText(parts = []) {
  return normalizeText(
    parts
      .flat()
      .filter(Boolean)
      .join(' ')
  );
}

function escapeRegex(value = '') {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  normalizeText,
  buildSearchText,
  escapeRegex
};
