const fs = require("fs");
const path = require("path");

const post = process.argv[3];
const imageLine = (file, dir) => `{% image "caption", "${path.parse(file).name}", "${dir}" %}\n`;

let files = [];

fs
    .readdirSync(`src/media/${post}/`)
    .filter((image) => image.match(/(jpeg|jpg|png)$/))
    .forEach((image) => files.push(imageLine(image, post)));
const postPath = `src/posts/en/${post}.md`;

var counter = 0;

files.forEach((line) => {
  fs.appendFileSync(postPath, line);
  if (++counter === 4 ) {
    fs.appendFileSync(postPath, '\n');
    counter = 0;
  }
}
);
