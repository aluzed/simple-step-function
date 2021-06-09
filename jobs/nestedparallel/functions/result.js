const path = require('path');
const fs = require('fs');

exports.handler = (payload) => {
  let a = fs.readFileSync(path.resolve(__dirname, 'a.txt'), 'utf8');
  let b = fs.readFileSync(path.resolve(__dirname, 'b.txt'), 'utf8');

  let result = parseInt(a, 10) + parseInt(b, 10); 

  fs.writeFileSync(path.resolve(__dirname, 'result.txt'), result.toString());

  return {
    result
  }
}