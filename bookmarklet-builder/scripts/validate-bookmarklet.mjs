#!/usr/bin/env node

import fs from 'node:fs';
import vm from 'node:vm';

const file = process.argv[2];

if (!file) {
  console.error('Usage: node validate-bookmarklet.mjs <bookmarklet-file>');
  process.exit(2);
}

const raw = fs.readFileSync(file, 'utf8').trim();

const errors = [];

if (!raw.startsWith('javascript:')) {
  errors.push('Output must start with javascript:.');
}

if (raw.includes('```')) {
  errors.push('Output must not contain Markdown fences.');
}

const payload = raw.startsWith('javascript:') ? raw.slice('javascript:'.length) : raw;

try {
  new vm.Script(payload);
} catch (error) {
  errors.push(`JavaScript does not parse: ${error.message}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('PASS: bookmarklet format and JavaScript parse check succeeded.');
