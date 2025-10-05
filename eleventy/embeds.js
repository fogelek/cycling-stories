function shortcodeImages(eleventyConfig) {
  eleventyConfig.addShortcode("strava", function () {
    return `<div class="strava-container">`;
  });

  eleventyConfig.addShortcode("strava-end", function () {
    return `</div>`;
  });

  eleventyConfig.addShortcode("strava-activity", function (activityId) {
    return `<div class="activity"><div class="strava-embed-placeholder" data-embed-type="activity" data-embed-id="${activityId}" data-style="standard" data-from-embed="true"></div></div><script src="https://strava-embeds.com/embed.js"></script>`;
  });

    eleventyConfig.addShortcode("komoot-collection", function (id) {
    return `<iframe src="https://www.komoot.com/collection/${id}/embed" width="100%" height="580" frameborder="0" scrolling="no"></iframe>`;
  });
}

module.exports = shortcodeImages;
