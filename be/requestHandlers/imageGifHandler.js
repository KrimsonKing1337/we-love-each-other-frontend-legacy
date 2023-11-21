const path = require('path');

const { readFile } = require('fs').promises;

const imgs = require('../../psp/generateImgWithText/img_bg.json');

const { publicImagesPath } = require('../../env.js');

const { getRandomImgPathGif } = require('../../psp/generateImgWithText/getRandomImgPath.js');

async function imageGifHandler(req, res) {
  const randomImagePath = getRandomImgPathGif(imgs);

  const imagePath = path.join(publicImagesPath, randomImagePath);

  const contents = await readFile(imagePath);

  res.setHeader('Content-Type', 'image/gif');
  res.writeHead(200);
  res.end(contents);
}

module.exports = { imageGifHandler };
