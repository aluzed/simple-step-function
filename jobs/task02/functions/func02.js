const path = require('path');
const fs = require('fs');

exports.handler = (payload) => {
  // Add 2 to random
  let add = payload.random + 2;

  fs.writeFileSync(path.resolve(__dirname, 'step_02.txt'), add.toString());

  return {
    add
  }
}