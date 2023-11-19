const { randomInt } = require('./randomInt.js');

/**
 *
 * @param imgs {object}
 * @param width {string}
 * @returns {string}
 */
function getRandomImgPath(imgs, width = '1920') {
  const random = randomInt(0, imgs[width].length);

  return `img_bg/${width}/${imgs[width][random]}`;
}

module.exports = { getRandomImgPath };
