const StateInterpreter = require('./state_interpreter');

let options = null;

/**
 * Reccursive function that execute the entire states
 * 
 * @param {Object} states States object
 * @param {String} stateName Current state name to run
 * @param {Object} payload Payload for current state
 */ 
const Interpreter = async (states, stateName, payload) => {
  try {
    // No state name -> null
    if(!stateName) return null;
    
    // Step not found
    if(!states[stateName]) throw new Error('Step not found');

    // If step found, get result
    console.log(`State found : ${stateName}, executing...`);

    // Exec each state
    const response = await StateInterpreter(states[stateName], payload, GetOptions(), Interpreter);
    
    // Check if next state
    if(response && response.nextState) {
      await Interpreter(states, response.nextState, response.result);
    }

    // No more step further
    return null;
  }
  catch(err) {
    // On error, stop processing
    console.log(err);
    return null;
  }
}

// Update default options
const SetOptions = newOptions => {
  options = newOptions;
}

const GetOptions = () => options;

module.exports = {
  Interpreter,
  SetOptions,
  GetOptions
}