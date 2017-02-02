const collectSymbols = require('./collectSymbols');

describe('collectSymbols', () => {

  test('one file usage', () => {
    expect(collectSymbols(['sandbox/src/index.js'])).toEqual({
      "errors": {},
      "symbols": {
        "sandbox/src/index.js": {
          "lodash": ["default", "fp", "lodash.* !require", "lodash_.*"],
          "lodash/fp": ["curryN !require"]
        }
      }
    });
  });

  test('same file couple times should be ok', () => {
    expect(collectSymbols([
      'sandbox/src/index.js',
      'sandbox/src/index.js',
      'sandbox/src/index.js',
      'sandbox/src/index.js',
    ])).toEqual({
      "errors": {},
      "symbols": {
        "sandbox/src/index.js": {
          "lodash": ["default", "fp", "lodash.* !require", "lodash_.*"],
          "lodash/fp": ["curryN !require"]
        }
      }
    });
  });

  test('it collects errors', () => {
    expect(collectSymbols(['sandbox/src/error.js'])).toEqual({
      symbols: {},
      errors: {
        "sandbox/src/error.js": "SyntaxError: Unexpected token (5:9)"
      }
    });

    expect(collectSymbols(['sandbox/src/nonexistent.js'])).toEqual({
      symbols: {},
      errors: {
        "sandbox/src/nonexistent.js": "Error: ENOENT: no such file or directory, open \'sandbox/src/nonexistent.js\'"
      }
    });
  });

});
