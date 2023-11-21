const fs = require('fs');
const path = require('path');

const defaultImages = path.resolve(__dirname, '../../../../m-days/01. digital/m-days-public/img_bg');
const pixelImages = path.resolve(__dirname, '../../../../m-days/01. digital/m-days-public/pixel');

/**
 *
 * @param dir {string}
 * @returns {string}
 */
function getImages(dir) {
  const subDirs = fs.readdirSync(dir);
  const result = {};

  subDirs.forEach((subDirCur) => {
    const filesPath = path.join(dir, subDirCur);

    result[subDirCur] = fs.readdirSync(filesPath);
  });

  return result;
}

try {
  const defaultImagesString = getImages(defaultImages);
  const pixelImagesString = getImages(pixelImages);

  const result = {
    default: defaultImagesString,
    pixel: pixelImagesString,
  };

  fs.writeFileSync(`./img_bg.json`, JSON.stringify(result));
} catch (err) {
  console.log(err);
}
