import {JSDOM} from 'jsdom';

/**
 * Generates a table of contents from HTML content
 * Extracts h2 and h3 headings with their IDs
 * @param {string} content - HTML content to parse
 * @returns {Array} Array of heading objects with nested structure
 */
export function generateToc(content) {
  if (!content) return [];

  const dom = new JSDOM(content);
  const headings = dom.window.document.querySelectorAll('h2, h3');

  if (headings.length === 0) return [];

  const toc = [];
  let currentH2 = null;

  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent.trim();
    const id = heading.id;

    // Skip headings without IDs
    if (!id) return;

    const item = {
      text,
      id,
      level
    };

    if (level === 2) {
      // Top level heading
      item.children = [];
      toc.push(item);
      currentH2 = item;
    } else if (level === 3 && currentH2) {
      // Nested under current h2
      currentH2.children.push(item);
    }
  });

  return toc;
}
