function shortcodeImages(eleventyConfig) {
  eleventyConfig.addShortcode("instagram", function (handle) {
    return `<a href="https://www.instagram.com/${handle}/" target="_blank">@${handle}</a>`;
  });

  eleventyConfig.addShortcode("strava", function (title, activityId) {
    return `<a href="https://www.strava.com/activities/${activityId}" target="_blank">Strava - ${title}</a>`;
  });


  eleventyConfig.addShortcode("komoot-collection", function (id) {
    return `<iframe src="https://www.komoot.com/collection/${id}/embed" width="100%" height="580" frameborder="0" scrolling="no"></iframe>`;
  });
}

module.exports = shortcodeImages;
