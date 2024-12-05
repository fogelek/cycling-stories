const markdownIt = require("markdown-it");
const markdownAttributes = require("markdown-it-attrs");
const markdownAnchor = require("markdown-it-anchor");
const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { minify } = require("terser");

module.exports = function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  let markdownLib = markdownIt(options)
    .use(markdownAttributes)
    .use(markdownAnchor);

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addFilter("dateFilter", (date) => {
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    return `${date.getDate()}-${month}-${date.getFullYear()}`;
  });

  eleventyConfig.addPassthroughCopy({
    "node_modules/gradientee/dist/*.js": "js/",
  });
  eleventyConfig.addPassthroughCopy({
    "src/favicon.ico": "dist/favicon.ico",
  });
  eleventyConfig.addPlugin(socialImages);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addShortcode(
    "image",
    function (alt, url, postUrl = undefined) {
      const fullUrl = `/media${postUrl || this.page.url}${url}`;
      return `<div class="image" title="${alt}"><img src="${fullUrl}.webp" alt="${alt}" loading="lazy"></div>`;
    }
  );

  eleventyConfig.addShortcode("image-single", function (alt, url) {
    return `<div class="image-single" title="${alt}"><img src="/media/${this.page.url}/${url}.webp" alt="${alt}" loading="lazy"></div>`;
  });

  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    async function (code, callback) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
      }
    }
  );

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
