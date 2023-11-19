const http = require('http');
const url = require('url');
const { readFile } = require('fs').promises;

const { main } = require('./psp/generateImgWithText/generateText.js');

// const host = '88.212.232.164';
const host = 'localhost';
const port = 3000;

const requestListener = async function (req, res) {
  // todo: пресеты типа psp, nokia, а так же распознавать параметры с указанием высоты и ширины экрана
  //  ?w=1920&h=1080&tz=3

  const params = url.parse(req.url, true).query;

  if (req.url === '/' || req.url.includes('/?')) {
    await main(params);

    const contents = await readFile(__dirname + '/psp/index.html');

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(contents);
  } else if (req.url === '/bg.jpg') {
    const contents = await readFile(__dirname + '/psp/bg.jpg');

    res.setHeader('Content-Type', 'image/jpeg');
    res.writeHead(200);
    res.end(contents);
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
