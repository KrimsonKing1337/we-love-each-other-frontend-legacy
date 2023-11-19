const http = require('http');
const url = require('url');
const { readFile } = require('fs').promises;

const { host, port } = require('./env.js');

const { getImageWithText } = require('./psp/generateImgWithText/getImageWithText.js');

let params = null;

const requestListener = async function (req, res) {
  // todo: пресеты типа psp, nokia, а так же распознавать параметры с указанием высоты и ширины экрана
  //  ?w=1920&h=1080&tz=3

  if (req.url === '/' || req.url.includes('/?')) {
    params = url.parse(req.url, true).query; // именно в этом месте нужно получать параметры

    const contents = await readFile(__dirname + '/psp/index.html');

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(contents);
  } else if (req.url === '/bg.jpg') {
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
