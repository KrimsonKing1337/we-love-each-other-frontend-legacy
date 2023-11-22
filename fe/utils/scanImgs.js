const fs = require('fs');
const path = require('path');

const { publicImagesPath } = require('../../env.js');

const defaultImages = path.join(publicImagesPath, 'img_bg');
const pixelImages = path.join(publicImagesPath, 'pixel');

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

  const pathOfFile = path.join(__dirname, 'img_bg.json');

  fs.writeFileSync(pathOfFile, JSON.stringify(result));
} catch (err) {
  console.log(err);
}
