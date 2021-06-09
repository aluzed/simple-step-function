const fs = require('fs');
const path = require('path');
const JOBS_FOLDER = path.resolve(__dirname, '..', '..', 'jobs');

/**
 * Get the exported handler 
 * 
 * @param {String} jobName 
 * @param {String} functionName 
 * 
 * @returns {Function}
 */
const GetScript = (jobName, functionName) => {
  let pathToFile = path.resolve(JOBS_FOLDER, jobName, 'functions', functionName);
  if(!fs.existsSync(pathToFile)) throw new Error('Script not found');
  let script = require(pathToFile);
  return script;
}

module.exports = GetScript;