const path = require('path');
const execSync = require('child_process').execSync;
const env = Object.create(process.env);

const scriptToRun = process.argv[2];

env.appRoot = path.join(__dirname, '../');
env.fe = path.join(__dirname, '../fe');
env.be = path.join(__dirname, '../be');

execSync(`node ${scriptToRun}`, { env, stdio: 'inherit' });
