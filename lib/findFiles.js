const globby = require('globby');
const assert = require('assert');

module.exports = function findFiles(path, ignores = []) {
  assert(!globby.hasMagic(path), 'Plain path is expected with no magic');
  return globby
    .sync(`${path}/**`, {
      follow: true,
      ignore: [].concat(['**/node_modules/**'], ignores)
    })
    .filter(p => /\.jsx?$/.test(p));
}
