const http = require('http');
const url = require('url');
const { readFile } = require('fs').promises;
const { nanoid } = require('nanoid');

const { host, port } = require('./env.js');

const { getImageWithText } = require('./psp/generateImgWithText/getImageWithText.js');

let params = null;

const requestListener = async function (req, res) {
  // todo: пресеты типа psp, nokia и т.д.
  // todo: генерация картинок без добавления текста по параметру text=true например

  if (req.url === '/' || req.url.includes('/?')) {
    params = url.parse(req.url, true).query; // именно в этом месте нужно получать параметры

    const contents = await readFile(__dirname + '/psp/index.html');

    const contentsReplaced = contents.toString().replace(
      'src="./bg.jpg"',
      `src="./bg_${nanoid()}.jpg"`
    );

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(contentsReplaced);
  } else if (req.url.includes('/bg')) {
    const contents = await getImageWithText(params);

    res.setHeader('Content-Type', 'image/jpeg');
    res.writeHead(200);
    res.end(contents);
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
