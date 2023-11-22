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
* @param variant {string}
* @returns {string}
*/
function getRandomImgPathGif(imgs, variant = 'h') {
  const random = randomInt(0, imgs.pixel[variant].length);

  return `pixel/h/${imgs.pixel[variant][random]}`;
}

module.exports = {
  getRandomImgPath,
  getRandomImgPathGif,
};
