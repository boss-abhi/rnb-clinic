'use strict';

const nextBin = require.resolve('next/dist/bin/next');

process.argv = [
  process.execPath,
  nextBin,
  'start',
  '-H',
  '0.0.0.0',
  '-p',
  String(process.env.PORT || 3000),
];

require(nextBin);

