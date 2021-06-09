const cp = require('child_process');
const path = require('path');
const DecodeResolverPath = require('../tools/decode_resolver_path');

module.exports = (resolverString, payload, options) => {
  return new Promise(async (resolve, reject) => {
    if(!resolverString) return resolve(null);
    
    const func = DecodeResolverPath(resolverString);
    if(!func || !func.handler) return resolve(null);

    let timeout = func.timeout || options.timeout;

    // Create autonomous thread
    const child = cp.fork(
      path.resolve(__dirname, '..', 'worker_thread')
    );

    // On message from thread
    child.on('message', message => {
      switch(message.type) {
        case 'error':
          // Exit child
          return reject(message.error);

        case 'result':
          // Exit child
          return resolve(message.result);          
      }
    });

    // Start step
    child.send({
      resolverString,
      payload
    });

    // Exit child on timeout
    setTimeout(() => {
      if(!child.killed) 
        child.kill(1);
        return reject(new Error('Timeout'));
    }, timeout)
  })
}