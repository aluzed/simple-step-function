const fs = require('fs');
const path = require('path');
const JOBS_FOLDER = path.resolve(__dirname, '..', '..', 'jobs');

/**
 * Get config.json file from a job name
 * 
 * @param {String} jobName Name of the job
 * 
 * @returns {Object} Config object
 */
const GetStatesConfig = (jobName) => {
  let pathToFile = path.resolve(JOBS_FOLDER, jobName, 'config.json');
  if(!fs.existsSync(pathToFile)) throw new Error('Config not found');
  let cfg = require(pathToFile);
  return cfg;
}

module.exports = GetStatesConfig;