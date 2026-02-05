/**
 * Posthtml plugin: add eleventy:ignore to <img> tags whose src is a GIF.
 * So @11ty/eleventy-img transform skips them and GIFs are left as-is (animated).
 */
export function ignoreGifImagesTransform(eleventyConfig, _options = {}) {
  if (!eleventyConfig.htmlTransformer?.addPosthtmlPlugin) {
    return;
  }

  eleventyConfig.htmlTransformer.addPosthtmlPlugin(
    'html',
    function ignoreGifImagesPosthtmlPlugin() {
      return function (tree) {
        tree.match({ tag: 'img' }, (node) => {
          if (node.attrs?.src && /\.gif(\?.*)?$/i.test(node.attrs.src)) {
            node.attrs['eleventy:ignore'] = '';
          }
          return node;
        });
        return tree;
      };
    },
    { priority: 0 } // run before image transform (priority -1)
  );
}
