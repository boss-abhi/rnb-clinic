const { spawn } = require('child_process');

const child = spawn('npm', ['run', 'start'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname,
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT'));
