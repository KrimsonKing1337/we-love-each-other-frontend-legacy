const http = require('http');
const { readFile } = require('fs').promises;

const { main } = require('./psp/generateImgWithText/generateText.js');

const host = '88.212.232.164';
const port = 3000;
// const port = 80;

const requestListener = async function (req, res) {
  console.log('___', __dirname);

  // todo: пресеты типа psp, nokia, а так же распознавать параметры с указанием высоты и ширины экрана
  //  ?w=1920&h=1080&tz=3

  if (req.url === '/') {
    await main();

    readFile(__dirname + '/psp/index.html')
      .then(contents => {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(contents);
      });
  } else if (req.url === '/bg.jpg') {
    readFile(__dirname + '/psp/bg.jpg')
      .then(contents => {
        res.setHeader('Content-Type', 'image/jpeg');
        res.writeHead(200);
        res.end(contents);
      });
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
