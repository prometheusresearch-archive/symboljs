#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const read = require('read-input');
const collectSymbols = require('../lib/collectSymbols');

const argv = require('yargs')
  .usage("$0 [options] [file1, file2, ...filen]")
  .help()
  .strict()
  .argv;

let files = argv._;

if (files.length == 0) {
  const {stdin} = process;
  let data = '';
  process.stdin.on('data', function(chunk) {
    data += chunk;
  });

  process.stdin.on('end', function() {
    let files = data.split('\n').filter(line => line);
    console.log(JSON.stringify(collectSymbols(files), null, 2));
  });
} else {
  console.log(JSON.stringify(collectSymbols(files), null, 2));
}

