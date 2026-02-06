/**
 * Returns up to 3 related posts: same-tag matches first (by relevance), then recent posts to fill.
 * @param {Array} allPosts - collections.allPosts
 * @param {object} currentPage - the current page (post)
 * @returns {Array} Up to 3 post objects with .url, .data, .date
 */
export function relatedPosts(allPosts, currentPage) {
  if (!Array.isArray(allPosts) || !currentPage) return [];
  const currentUrl = currentPage.url;
  const currentTags = currentPage.data?.tags || [];

  const others = allPosts.filter(
    p => p.url !== currentUrl && !p.data?.draft
  );

  if (others.length === 0) return [];

  // Score by number of shared tags (excluding 'posts')
  const withScore = others.map(p => {
    const postTags = p.data?.tags || [];
    const common = postTags.filter(
      t => t !== 'posts' && currentTags.includes(t)
    );
    return { post: p, commonCount: common.length };
  });

  // Tag-based: same-tag posts, most relevant first
  const byTag = withScore
    .filter(x => x.commonCount > 0)
    .sort((a, b) => b.commonCount - a.commonCount)
    .slice(0, 3)
    .map(x => x.post);

  const result = [...byTag];
  if (result.length >= 3) return result;

  // Fill with most recent posts not already in result
  const resultUrls = new Set(result.map(p => p.url));
  const rest = others
    .filter(p => !resultUrls.has(p.url))
    .sort((a, b) => (b.date < a.date ? -1 : 1))
    .slice(0, 3 - result.length);

  return [...result, ...rest];
}
