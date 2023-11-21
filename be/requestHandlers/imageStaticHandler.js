const { getImageWithText } = require('../../psp/generateImgWithText/getImageWithText.js');

const { getParams } = require('../utils/getParams.js');

async function imageStaticHandler(req, res) {
  const params = getParams();

  const contents = await getImageWithText(params);

  res.setHeader('Content-Type', 'image/jpg');
  res.writeHead(200);
  res.end(contents);
}

module.exports = { imageStaticHandler };
