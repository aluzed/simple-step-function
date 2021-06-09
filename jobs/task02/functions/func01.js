const path = require('path');
const fs = require('fs');

exports.handler = () => {
  // random between 1 and 100
  let random = Math.floor(Math.random()  * 100) + 1;
  
  fs.writeFileSync(path.resolve(__dirname, 'step_01.txt'), random.toString());

  return {
    random 
  }
}