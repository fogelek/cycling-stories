const strings = new Map();
strings.set("pl", require("./strings/pl.json"));
strings.set("en", require("./strings/en.json"));

function initializei18n(eleventyConfig) {
  eleventyConfig.addNunjucksFilter("i18n", function (stringName, lang) {
    return strings.get(lang || "en")?.[stringName] || stringName;
  });

  eleventyConfig.addNunjucksFilter("sameLang", function (collection = []) {
    const { lang, page } = this.ctx;
    // console.log(lang);
    return collection.filter(post => {
      return post.data.lang === lang;
    });
  });
}

module.exports = initializei18n;