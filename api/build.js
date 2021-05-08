#!/usr/bin/env node

const { build } = require('estrella');
const globby = require('globby');

globby('./src/**/*.ts').then((sourceFiles) => {
  build({
    entryPoints: sourceFiles,
    outdir: 'dist/',
    target: 'es2019',
    platform: 'node',
    format: 'cjs',
    tsconfig: './tsconfig.json',
    watch: process.env.NODE_ENV === 'development' || true,
    run: ['node', 'dist/index.js'],
  });
});
