const http = require('http');

const { host, port } = require('./env.js');

const { rootHandler } = require('./be/requestHandlers/rootHandler.js');
const { imageGifHandler } = require('./be/requestHandlers/imageGifHandler.js');
const { imageStaticHandler } = require('./be/requestHandlers/imageStaticHandler.js');
const { getParams } = require('./be/utils/getParams.js');

const requestListener = async function (req, res) {
  // todo: пресеты типа psp, nokia и т.д.
  // todo: генерация картинок без добавления текста по параметру text=true например

  if (req.url === '/' || req.url.includes('/?')) {
    getParams(req, true);

    await rootHandler(req, res);
  } else if (req.url.includes('.gif')) {
    await imageGifHandler(req, res);
  } else if (req.url.includes('.jpg')) {
    await imageStaticHandler(req, res);
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
