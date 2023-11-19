const path = require('path');
const sharp = require('sharp');

const { getRandomImgPath } = require('./getRandomImgPath.js');

const imgs = require('./img_bg.json');

const publicImagesPath = path.resolve(__dirname, '../../../../m-days/01. digital/m-days-public');

// const publicImagesPath = path.resolve('./', '../m-days.ru');

function adjustForTimezone(date, tz = 3 ) {
  date.setHours(date.getHours() + tz);

  return date;
}

/**
 *
 * @param params
 * @param params.w {string}
 * @param params.h {string}
 * @param params.tz {string}
 * @returns {Promise<void>}
 */
async function main({ w = '1920', h = '1080', tz = '3' }) {
  const d = new Date();
  const dateUtc = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
  const dateObj = adjustForTimezone(dateUtc, Number(tz));

  // current date
  // adjust 0 before single digit date
  const day = ('0' + dateObj.getDate()).slice(-2);

  // current month
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);

  // current year
  const year = dateObj.getFullYear();

  // current hours
  const hours = ('0' + dateObj.getHours()).slice(-2);

  // current minutes
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);

  const timeLabel = `${hours}:${minutes}`;
  const dateLabel = `${day}.${month}.${year}`;

  const randomImagePath = getRandomImgPath(imgs, w);
  const imagePath = path.join(publicImagesPath, randomImagePath);

  const image = await sharp(imagePath);
  const metadata = await image.metadata();

  const shadow = Buffer.from(`
    <svg height="${metadata.height}" width="${metadata.width}">
      <rect x="0" y="0" width="100%" height="100%" fill="#000" fill-opacity="0.3" />
    </svg>
  `);

  const timeHeight = metadata.height / 2;

  const time = Buffer.from(`
    <svg height="${timeHeight}" width="${metadata.width}">
      <text x="50%" y="50%" text-anchor="middle" dy="0.4em" font-size="${timeHeight / 2.5}" fill="#fff" font-family="sans">
        ${timeLabel}
      </text> 
    </svg>
  `);

  const dateHeight = metadata.height / 1.6;

  const date = Buffer.from(`
    <svg height="${dateHeight}" width="${metadata.width}">
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

  // await image.composite(compositeImages).toFile('result.jpg');
  await image.composite(compositeImages).toFile(path.join(__dirname, '../bg.jpg'));
}

// main();

module.exports = { main };
