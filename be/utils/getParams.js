const url = require('url');

let params = null;

function getParams(req) {
  if (params && !req) {
    return params;
  }

  params = url.parse(req.url, true).query;

  return params;
}

module.exports = { getParams };
