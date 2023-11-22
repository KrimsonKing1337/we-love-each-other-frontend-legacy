const execSync = require('child_process').execSync;
const env = Object.create(process.env);

const scriptToRun = process.argv[2];

env.appRoot = __dirname;
env.fe = __dirname + '/fe';
env.be = __dirname + '/be';

execSync(`node ${scriptToRun}`, { env, stdio: 'inherit' });
