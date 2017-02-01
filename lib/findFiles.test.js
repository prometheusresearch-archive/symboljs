const findFiles = require('./findFiles');

describe('findFiles', () => {
  test('basic usage / follows symlinks', () => {
    expect(findFiles('sandbox')).toEqual([
      "sandbox/src/index.js",
      "sandbox/src/subdir/Module.js",
      "sandbox/src/symlink/Module.js",
    ]);
  });

  test('it respects ignores', () => {
    expect(findFiles('sandbox',
                     ['**/**index.js', 'sandbox/src/symlink/*'])).toEqual([
      "sandbox/src/subdir/Module.js",
    ]);
  });
});
