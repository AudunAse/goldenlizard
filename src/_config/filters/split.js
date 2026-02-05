/**
 * Split a string by a delimiter and optionally trim each item
 * @param {string} str - The string to split
 * @param {string} delimiter - The delimiter to split by
 * @param {boolean} trim - Whether to trim each item (default: true)
 * @returns {string[]} Array of split strings
 */
export function splitString(str, delimiter = ',', trim = true) {
  if (!str) return [];
  const parts = str.split(delimiter);
  return trim ? parts.map(part => part.trim()) : parts;
}
