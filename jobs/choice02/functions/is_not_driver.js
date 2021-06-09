const fs = require('fs');
const path = require('path');

exports.handler = (payload) => {
  fs.writeFileSync(
    path.resolve(__dirname, 'result.txt'),
    'is not driver at ' + payload.age  + ' years old'
  );
}