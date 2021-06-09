const path = require('path');
const fs = require('fs');

exports.handler = (payload) => {
  // random between 1 and 100
  let random = Math.floor(Math.random()  * 100) + 1;
  
  fs.writeFileSync(path.resolve(__dirname, 'b.old.txt'), random.toString());

  return {
    random 
  }
}