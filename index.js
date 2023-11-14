const http = require('http');
const { readFile } = require('fs').promises;
const { execSync } = require('child_process');

const host = 'localhost';
const port = 3000;

const requestListener = function (req, res) {
  if (req.url === '/') {
    execSync('node ./psp/generateImgWithText/generateText.js');

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
