const { getContentType } = require('./getContentType.js');

function send({res, content, type, status = 200}) {
  const contentType = getContentType(type);

  res.setHeader('Content-Type', contentType);
  res.writeHead(status);
  res.end(content);
}

module.exports = { send };
