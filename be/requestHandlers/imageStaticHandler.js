const { getImageWithDateAndTime } = require(process.env.fe + '/getImageWithDateAndTime.js');

const { getParams } = require('../utils/getParams.js');

async function imageStaticHandler(req, res) {
  const params = getParams();

  const contents = await getImageWithDateAndTime(params);

  res.setHeader('Content-Type', 'image/jpg');
  res.writeHead(200);
  res.end(contents);
}

module.exports = { imageStaticHandler };
