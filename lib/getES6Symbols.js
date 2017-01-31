const assert = require('assert');

function getName(node) {
  const {type, value} = node;
  assert(type==='StringLiteral',
        'Only supporting StringLiteral for ES6 module name');
  return value;
}

function getSymbols(nodes) {
  let ret = []
  nodes.forEach(node => {
    switch(node.type) {
      case 'ImportDefaultSpecifier':
        assert(node.local.type === 'Identifier');
        ret.push('default');
        break;

      case 'ImportNamespaceSpecifier':
        assert(node.local.type === 'Identifier');
        ret.push(`${node.local.name}.*`);
        break;

      case 'ImportSpecifier':
        assert(node.imported.type === 'Identifier');
        ret.push(node.imported.name);
        break;

    }
  });
  return ret;
}

module.exports = function getES6Symbols(nodes) {
  return nodes
    .filter(({type}) => type === 'ImportDeclaration')
    .map(node => ({
      name: getName(node.source),
      symbols: getSymbols(node.specifiers).sort()
    }));
};
