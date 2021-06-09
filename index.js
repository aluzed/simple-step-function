// Exec
const { SetOptions, Interpreter } = require('./engine/interpreter');
const DEFAULT_OPTIONS = require('./engine/default_options.json');

const START_TIME = Date.now(); // Log purpose

/**
 * 
 * @param {Object} job JSON object of the job
 * @param {Object} options JSON object of the options
 * @returns 
 */
module.exports = async (job, options={}) => {
  try {
    // If no config return null
    if(!job) return null;

    console.log(`Executing job`)

    let timeout = options.timeout || DEFAULT_OPTIONS.timeout; // Default step timeout = 5000ms
    let payload = {};
    if(options.payload) {
      payload = JSON.parse(options.payload);
    }

    // Update global options
    SetOptions({
      timeout
    });

    // If the first job has a payload
    if(job.startAt && job.states[job.startAt] && job.states[job.startAt].payload) {
      payload = Object.assign(payload, job.states[job.startAt].payload);
    }

    await Interpreter(job.states, job.startAt, payload);

    // Log perf
    const END_TIME = Date.now(); // Log purpose
    let t = END_TIME - START_TIME;
    console.log(`Done in ${
      t > 1000 ? `${(t/1000).toFixed(1)} sec` : `${t} ms`
    }`);

    process.exit(0);
  }
  catch(err) {
    console.log(err);
    process.exit(1);
  }
}