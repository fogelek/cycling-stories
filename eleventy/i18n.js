const strings = new Map();
strings.set("pl", require("./strings/pl.json"));
strings.set("en", require("./strings/en.json"));

function filterI18n(eleventyConfig) {
  eleventyConfig.addNunjucksFilter("i18n", function (stringName, lang) {
    return strings.get(lang || "en")?.[stringName] || stringName;
  });
}

module.exports = filterI18n;
