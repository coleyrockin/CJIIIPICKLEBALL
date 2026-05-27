#!/usr/bin/env node
/**
 * CSP hash freshness check.
 *
 * Verifies that the SHA-256 hashes pinned in our CSP and SRI integrity
 * attribute match the current content. Two hashes are checked:
 *
 *   1. The inline <script type="application/ld+json"> JSON-LD block.
 *      Must appear in the script-src directive of:
 *        - index.html <meta http-equiv="Content-Security-Policy" ...>
 *        - _headers Content-Security-Policy: ...
 *
 *   2. The external js/main.js file.
 *      Must appear in:
 *        - index.html <meta http-equiv="Content-Security-Policy" ...>
 *        - _headers Content-Security-Policy: ...
 *        - the integrity="..." attribute on <script src="js/main.js" ...>
 *
 * On drift, prints the file/CSP location at fault and the correct hash
 * to substitute, then exits non-zero.
 *
 * Usage:
 *   node scripts/check-csp-hashes.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const HEADERS = path.join(ROOT, '_headers');
const MAIN_JS = path.join(ROOT, 'js/main.js');

function sha256(buf) {
  return 'sha256-' + crypto.createHash('sha256').update(buf).digest('base64');
}

function fail(messages) {
  console.error('CSP hash check FAILED:');
  for (const m of messages) console.error('  • ' + m);
  process.exit(1);
}

const html = fs.readFileSync(INDEX, 'utf8');
const headers = fs.readFileSync(HEADERS, 'utf8');
const mainJs = fs.readFileSync(MAIN_JS);

const errors = [];

// ---- 1. JSON-LD inline script ----
const jsonLdMatch = html.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
);
if (!jsonLdMatch) {
  fail(['JSON-LD <script type="application/ld+json"> block not found in index.html.']);
}
const jsonLdHash = sha256(jsonLdMatch[1]);

if (!html.includes(jsonLdHash)) {
  errors.push(
    'index.html CSP <meta> is missing the current JSON-LD hash.\n' +
    '      Expected: ' + jsonLdHash
  );
}
if (!headers.includes(jsonLdHash)) {
  errors.push(
    '_headers CSP is missing the current JSON-LD hash.\n' +
    '      Expected: ' + jsonLdHash
  );
}

// ---- 2. External js/main.js (CSP + SRI integrity) ----
const mainJsHash = sha256(mainJs);

if (!html.includes(mainJsHash)) {
  errors.push(
    'index.html CSP <meta> is missing the current js/main.js hash.\n' +
    '      Expected: ' + mainJsHash
  );
}
if (!headers.includes(mainJsHash)) {
  errors.push(
    '_headers CSP is missing the current js/main.js hash.\n' +
    '      Expected: ' + mainJsHash
  );
}

const integrityMatch = html.match(
  /<script\s+[^>]*src="js\/main\.js[^"]*"[^>]*integrity="([^"]+)"/
);
if (!integrityMatch) {
  errors.push(
    '<script src="js/main.js" ...> is missing an integrity="..." attribute.\n' +
    '      Expected: integrity="' + mainJsHash + '"'
  );
} else if (integrityMatch[1] !== mainJsHash) {
  errors.push(
    'integrity="..." on <script src="js/main.js"> is stale.\n' +
    '      Found:    ' + integrityMatch[1] + '\n' +
    '      Expected: ' + mainJsHash
  );
}

if (errors.length) fail(errors);

console.log('CSP hash check OK');
console.log('  JSON-LD: ' + jsonLdHash);
console.log('  main.js: ' + mainJsHash);
