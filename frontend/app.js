const { spawn } = require('child_process');
const path = require('path');

const nextBin = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');
const port = process.env.PORT || '3000';

const child = spawn(process.execPath, [nextBin, 'start', '-p', String(port), '-H', '0.0.0.0'], {
  stdio: 'inherit',
  cwd: __dirname,
  env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 0));
process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT'));
