
function isAcceptableRequireCall(node) {
  return node.type === 'CallExpression'
    && node.callee.name === 'require'
    && node.arguments.length === 1
    && node.arguments[0].type === 'StringLiteral';
}

function isAcceptableRequireMember(node) {
  return node.type === 'MemberExpression'
    && isAcceptableRequireCall(node.object)
    && node.property.type === 'Identifier';
}

module.exports = function getRequireSymbols(nodes) {
  let ret = [];
  nodes
    .filter(({type}) => type === 'VariableDeclaration')
    .forEach(({declarations}) => {
      declarations
        .filter(({init}) =>
          init && (
            isAcceptableRequireCall(init)
            || isAcceptableRequireMember(init)
          )
        )
        .forEach(declaration => {
          switch(declaration.init.type) {

            case 'CallExpression':
              let {id, init} = declaration;
              if (id.type === 'Identifier') {
                ret.push({
                  name: init.arguments[0].value,
                  symbols: [`${id.name}.* !require`]
                });
              } else if (id.type === 'ObjectPattern') {
                let symbols = id
                  .properties
                  .filter(({key}) => key.type === 'Identifier')
                  .map(({key}) => `${key.name} !require`);
                if (symbols.length) {
                  ret.push({
                    name: init.arguments[0].value,
                    symbols
                  });
                }
              }
              break;

            case 'MemberExpression':
              ret.push({
                name: declaration.init.object.arguments[0].value,
                symbols: [`${declaration.init.property.name} !require`]
              });
              break;
          }
        });
    })
  return ret;
};
