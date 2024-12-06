function shortcodeImages(eleventyConfig) {
  eleventyConfig.addShortcode("image", function (alt, url, media) {
    return `<div class="image" title="${alt}"><img <img src="/media/${media}/${url}.webp" alt="${alt}" loading="lazy"></div>`;
  });

  eleventyConfig.addShortcode("image-single", function (alt, url, media) {
    return `<div class="image-single" title="${alt}"><img src="/media/${media}/${url}.webp" alt="${alt}" loading="lazy"></div>`;
  });
}

module.exports = shortcodeImages;
