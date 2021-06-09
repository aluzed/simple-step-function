const GetScript = require('./get_script');

/**
 * Get the exported handler of the resolver from a string
 * 
 * @param {String} resolverString Resolver (ex : taskName::scriptName)
 * 
 * @returns {Function} Resolver function
 */
module.exports = resolverString => {
  let [jobName, functionName] = resolverString.split('::');
  if(!functionName) throw new Error('Bad resolver format, expect ::');
  return GetScript(jobName, functionName +  '.js');
}