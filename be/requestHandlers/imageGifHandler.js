const path = require('path');
const { readFile } = require('fs').promises;

const { getParams } = require('../utils/getParams.js');

const { publicImagesPath } = require(process.env.appRoot + '/env.js');

const { getRandomImgPathGif } = require(process.env.fe + '/utils/getRandomImgPath.js');

const imgs = require(process.env.fe + '/img_bg.json');

async function imageGifHandler(req, res) {
  const params = getParams();

  const randomImagePath = getRandomImgPathGif(imgs, params.gv);

  const imagePath = path.join(publicImagesPath, randomImagePath);

  const contents = await readFile(imagePath);

  res.setHeader('Content-Type', 'image/gif');
  res.writeHead(200);
  res.end(contents);
}

module.exports = { imageGifHandler };
