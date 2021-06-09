const argv = require('minimist')(process.argv.slice(2));
const Exec = require('../index');
let GetStateConfig = require('../engine/tools/get_states_config');

const jobName = argv._[0];
if(!jobName) throw new Error('Missing arg : jobName');

(async() => {

  let options = argv;
  delete options._;

  let config = GetStateConfig(jobName);
  await Exec(config, options);

})();