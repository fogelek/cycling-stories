function shortcodeImages(eleventyConfig) {
  eleventyConfig.addShortcode("image", function (alt, url, media) {
    return `<div class="image" title="${alt}"><img src="/media/${media}/${url}.webp" alt="${alt}" loading="lazy"></div>`;
  });

  eleventyConfig.addShortcode("image-single", function (alt, url, media) {
    return `<div class="image-single" title="${alt}"><img src="/media/${media}/${url}.webp" alt="${alt}" loading="lazy"></div>`;
  });

  eleventyConfig.addShortcode("image-gallery", function (alt, url, media) {
    return `<div class="image-gallery" title="${alt}"><img src="/media/${media}/${url}.webp" alt="${alt}" loading="lazy"></div>`;
  });

  eleventyConfig.addShortcode("profile", function (title, segment) {
    const value = title
      .toLowerCase()
      .split("/")[0]
      .replace(/'/, "")
      .trimEnd()
      .replace(/ /g, "-");
    return `<li><input type="radio" name="profile" value="${title}" id="${value}" data-segment="${segment}"/><label for="${value}">${title}</label></li>`;
  });
}

module.exports = shortcodeImages;
