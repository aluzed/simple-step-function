const path = require('path');
const fs = require('fs');

exports.handler = (payload) => {
  // Sub 9 to add
  let sub = payload.add - 9;

  fs.writeFileSync(path.resolve(__dirname, 'step_03.txt'), sub.toString());

  return {
    sub
  }
}