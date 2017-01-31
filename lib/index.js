var babylon = require('babylon');
var fs = require('fs');

fs.readFile('UseExistingAction.js', {encoding: 'utf-8'}, function(err, data) {
  console.log(ast.program);

  ast.program.body.map(t => {
    console.log(t);
  });
})
