const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

let files = [];

const addDir = (dir) =>
  fs
    .readdirSync(`src/${dir}`)
    .filter((image) => image.match(/(jpeg|jpg|png)$/))
    .forEach((image) => files.push(`${dir}/${image}`));

addDir("images");

const media = fs.readdirSync("src/media").filter(file => file !== '.DS_Store');
media.forEach((dir) => addDir(`media/${dir}`));

const convert = (name) => {
  const src = `src/${name}`;
  const filePath = path.parse(name);
  const dst = `dist/${filePath.dir}/${filePath.name}.webp`;
  if (fs.existsSync(dst)) {
    return;
  }
  if (!fs.existsSync(`dist/${filePath.dir}`)) {
    fs.mkdirSync(`dist/${filePath.dir}`, { recursive: true });
  }
  const i = sharp(fs.readFileSync(src));
  i.resize({height: filePath.name === "thumbnail" ? 450 : 1200, withoutEnlargement: true}).toFormat("webp", { quality: 80 });

  return i
    .toFile(dst)
    .then(() => console.log("Converted", dst))
    .catch((e) => console.log("Failed converting", dst, e, "skipping..."));
};

const promises = files.map((name) => convert(name));

Promise.all(promises)
  .then(() => console.log("Done"))
  .catch((e) => console.error(e));
