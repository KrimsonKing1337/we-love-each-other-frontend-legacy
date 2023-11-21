const { randomInt } = require('./randomInt.js');
const { allowWidths } = require('./utils.js');

/**
 *
 * @param imgs {object}
 * @param width {string}
 * @returns {string}
 */
function getRandomImgPath(imgs, width = '1920') {
  let w = width;

  const isAllowWidth = allowWidths.some((allowWidth) => allowWidth === width);

  if (!isAllowWidth) {
    w = '1920';
  }

  if (Number(w) < 640) {
    w = '640';
  }

  const random = randomInt(0, imgs.default[w].length);

  return `img_bg/${w}/${imgs.default[w][random]}`;
}

/**
* @param imgs {object}
* @param width {string}
* @returns {string}
*/
function getRandomImgPathGif(imgs, width = '1920') {
  const random = randomInt(0, imgs.pixel.h.length);

  return `pixel/h/${imgs.pixel.h[random]}`;
}

module.exports = {
  getRandomImgPath,
  getRandomImgPathGif,
};
