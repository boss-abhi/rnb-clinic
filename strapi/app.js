const { spawn } = require('child_process');
const path = require('path');

const strapiBin = path.join(__dirname, 'node_modules', '@strapi', 'strapi', 'bin', 'strapi.js');

const child = spawn(process.execPath, [strapiBin, 'start'], {
  stdio: 'inherit',
  cwd: __dirname,
  env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 0));
process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT'));
