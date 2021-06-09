const path = require('path');
const fs = require('fs');

exports.handler = (payload) => {
  let add = Math.floor(Math.random()  * 50) + 1;
  let result = payload.random + add; 

  fs.writeFileSync(path.resolve(__dirname, 'b.txt'), `${result.toString()}`);

  return {
    result
  }
}