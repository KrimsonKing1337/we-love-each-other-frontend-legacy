function getContentType(type) {
  if (type === 'html') {
    return 'text/html';
  }

  if (type === 'jpg') {
    return 'image/jpg';
  }

  if (type === 'gif') {
    return 'image/gif';
  }
}

module.exports = { getContentType };
