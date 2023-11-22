const path = require('path');
const sharp = require('sharp');

const { publicImagesPath } = require('../env.js');

const { getRandomImgPath } = require('./utils/getRandomImgPath.js');
const { getDate } = require('./utils/getDate.js');

const imgs = require('./img_bg.json');

/**
 *
 * @param params
 * @param params.w {string}
 * @param params.h {string}
 * @param params.tz {string}
 * @returns {Promise}
 */
async function getImageWithDateAndTime({ w = '1920', h, tz = '3' }) {
  const {
    day,
    month,
    year,
    hours,
    minutes,
  } = getDate(tz);

  const timeLabel = `${hours}:${minutes}`;
  const dateLabel = `${day}.${month}.${year}`;

  const randomImagePath = getRandomImgPath(imgs, w);
  const imagePath = path.join(publicImagesPath, randomImagePath);

  const width = Number(w);
  const height = h ? Number(h) : undefined;

  const image = await sharp(imagePath).resize({
    width,
    height,
  });

  const resizedImage = await image.toBuffer({ resolveWithObject: true });
  const metaHeight = resizedImage.info.height;
  const metaWidth = resizedImage.info.width;

  const shadow = Buffer.from(`
    <svg height="${metaHeight}" width="${metaWidth}">
      <rect x="0" y="0" width="100%" height="100%" fill="#000" fill-opacity="0.3" />
    </svg>
  `);

  const timeHeight = metaHeight / 2;

  const time = Buffer.from(`
    <svg height="${timeHeight}" width="${metaWidth}">
      <text x="50%" y="50%" text-anchor="middle" dy="0.4em" font-size="${timeHeight / 2.5}" fill="#fff" font-family="sans">
        ${timeLabel}
      </text> 
    </svg>
  `);

  const dateHeight = metaHeight / 1.6;

  const date = Buffer.from(`
    <svg height="${dateHeight}" width="${metaWidth}">
      <text x="50%" y="50%" text-anchor="middle" dy="0.4em" font-size="${dateHeight / 6}" font-stretch="ultra-condensed" fill="#fff" font-family="sans">
        ${dateLabel}
      </text> 
    </svg>
  `);

  const compositeImages = [
    {
      input: shadow,
      gravity: 'center'
    },
    {
      input: time,
      gravity: 'center'
    },
    {
      input: date,
      gravity: 'south'
    }
  ];

  // await image.composite(compositeImages).toFile(path.join(__dirname, '../bg.jpg'));
  return await image.composite(compositeImages).toBuffer();
}

module.exports = { getImageWithDateAndTime };
