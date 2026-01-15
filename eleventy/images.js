function shortcodeImages(eleventyConfig) {
  eleventyConfig.addShortcode("images", function (count = 0) {
    const style = count > 0 ? ` style="--image-count: ${count};"` : "";
    const className = count > 0 ? "images fixed-width" : "images";
    return `<div class="${className}"${style}>`;
  });

  eleventyConfig.addShortcode("gallery", function () {
    return `<div class="gallery">`;
  });

  eleventyConfig.addShortcode("images-end", function () {
    return `</div>`;
  });

  eleventyConfig.addShortcode("image", function (alt, url, media) {
    return `<div class="image" title="${alt}"><img src="/media/${media}/${url}.webp" alt="${alt}" loading="lazy"></div>`;
  });

  eleventyConfig.addShortcode("image-single", function (alt, url, media) {
    return `<div class="image-single" title="${alt}"><img src="/media/${media}/${url}.webp" alt="${alt}" loading="lazy"></div>`;
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
