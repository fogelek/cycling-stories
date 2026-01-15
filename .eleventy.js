const markdownIt = require("markdown-it");
const markdownAttributes = require("markdown-it-attrs");
const markdownAnchor = require("markdown-it-anchor");
const markdownMark = require('markdown-it-mark');
const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const shortcodeImages = require("./eleventy/images");
const shortcodeEmbeds = require("./eleventy/embeds");
const initializei18n = require("./eleventy/i18n");
const { minify } = require("terser");

module.exports = function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  let markdownLib = markdownIt(options)
    .use(markdownAttributes)
    .use(markdownAnchor)
    .use(markdownMark);

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

  shortcodeImages(eleventyConfig);
  shortcodeEmbeds(eleventyConfig);
  initializei18n(eleventyConfig);

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
