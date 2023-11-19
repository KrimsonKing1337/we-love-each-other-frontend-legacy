const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../../../../m-days/01. digital/m-days-public');
const dir = `${publicDir}/img_bg`;

try {
  const subDirs = fs.readdirSync(dir);
  const result = {};

  subDirs.forEach((subDirCur) => {
    const filesPath = path.join(dir, subDirCur);

    result[subDirCur] = fs.readdirSync(filesPath);
  });

  fs.writeFileSync(`./img_bg.json`, JSON.stringify(result));
} catch (err) {
  console.log(err);
}
