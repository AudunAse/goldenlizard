/** All blog posts as a collection. */
export const getAllPosts = collection => {
  return collection.getFilteredByGlob('./src/posts/**/*.md').reverse();
};

/** All relevant pages as a collection for sitemap.xml */
export const showInSitemap = collection => {
  return collection.getFilteredByGlob('./src/**/*.{md,njk}');
};

/** All tags from all posts as a collection - excluding custom collections */
export const tagList = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'docs', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

/** All tips from posts - flattened for The Vault page. Each tip has title, anchor, sourcePost, url, tags. Sorted by source post date (newest first). */
export const allTips = collection => {
  const posts = collection.getFilteredByGlob('./src/posts/**/*.md');
  const postsByDate = [...posts].sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date) : new Date(0);
    const dateB = b.data.date ? new Date(b.data.date) : new Date(0);
    return dateB - dateA; // newest first
  });
  return postsByDate.flatMap(post => {
    const tips = post.data?.tips || [];
    return tips.map(tip => ({
      title: tip.title,
      anchor: tip.anchor,
      sourcePost: post,
      url: `${post.url}#${tip.anchor}`,
      tags: post.data.tags || []
    }));
  });
};
