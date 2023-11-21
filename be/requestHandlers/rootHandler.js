const { readFile } = require('fs').promises;

const { replaceImgSrc } = require('../utils/replaceImgSrc.js');
const { getParams } = require('../utils/getParams.js');
const { replaceMetaRefresh } = require('../utils/replaceMetaRefresh.js');

async function rootHandler(req, res) {
  const params = getParams();

  const contents = await readFile(process.cwd() + '/psp/index.html');

  let imageType = 'static';

  if (params.img === 'gif') {
    imageType = 'gif';
  }

  let contentsReplaced = replaceImgSrc({
    type: imageType,
    contents,
  });

  if (params.rt) {
    contentsReplaced = replaceMetaRefresh({
      contents: contentsReplaced,
      value: params.rt
    });
  }


  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end(contentsReplaced);
}

module.exports = { rootHandler };
