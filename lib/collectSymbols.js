
const fs = require('fs');
const getSymbols = require('./getSymbols');


function collectSymbols(files) {
  let ret = {symbols: {}, errors: {}};
  files.forEach(file => {
    try {
      let content = fs.readFileSync(file).toString();
      ret.symbols[file] = getSymbols(content);
    } catch(e) {
      ret.errors[file] = e.toString();
    }
  });
  return ret;
}

module.exports = collectSymbols;
