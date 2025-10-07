/**
 * Check if a modular content block has any non-empty content
 * @param {Array} blocks - array of blocks
 * @param {Array} fields - list of fields to check in each block
 * @returns {boolean}
 */
export function hasContent(blocks, fields) {
  if (!Array.isArray(blocks) || blocks.length === 0) return false;

  return blocks.some((block) =>
    fields.some((field) => {
      const value = block[field];
      return (
        value !== undefined && value !== null && String(value).trim() !== ''
      );
    })
  );
}
