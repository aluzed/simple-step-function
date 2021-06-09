/**
 * Worker thread
 */

const DecodeResolverPath = require('./tools/decode_resolver_path');

// Check if handler is an async function
const IsAsync = (func) => {
  return func.constructor.name === 'AsyncFunction';
}

// On message, start the job
process.on('message', params => {

  let { resolverString, payload } = params;
  (async() => {
    try {
      let resolver = DecodeResolverPath(resolverString);

      // If no handler found, throw an error
      if(!resolver.handler) throw new Error('Handler not found');
      let result = null;
      
      if(IsAsync(resolver.handler)) {
        result = await resolver.handler(payload);
      } 
      else {
        result = resolver.handler(payload);
      }

      process.send({
        type: 'result',
        result
      }) 
      process.exit(0);
    }
    catch(error) {
      process.send({
        type: 'error',
        error: error.message
      })
      process.exit(1);
    }
  })()

})