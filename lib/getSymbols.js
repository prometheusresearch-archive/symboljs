const babylon = require('babylon');
const getES6Symbols = require('./getES6Symbols');
const getRequireSymbols = require('./getRequireSymbols');

function getSymbols(text) {
  let ast = babylon.parse(text, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'flow',
      'doExpressions',
      'objectRestSpread',
      'decorators',
      'classProperties',
      'exportExtensions',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
    ]
  });

  let ret = {};
  [].concat(
    getES6Symbols(ast.program.body),
    getRequireSymbols(ast.program.body)
  ).forEach(({name, symbols}) => {
      ret[name] = [].concat(ret[name] || [], symbols);
  });

  for (let key in ret) {
    ret[key] = Array.from(new Set(ret[key].sort()));
  }

  return ret;
}


module.exports = getSymbols;
