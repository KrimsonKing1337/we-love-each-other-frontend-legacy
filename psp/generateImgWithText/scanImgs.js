const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../../../../m-days/01. digital/m-days-public');
const dir = `${publicDir}/img_bg/640`;

try {
  const files = fs.readdirSync(dir);
  const filesJSON = JSON.stringify(files);

  fs.writeFileSync(`./img_bg.json`, filesJSON);
} catch (err) {
  console.log(err);
}
