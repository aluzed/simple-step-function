const Task = require('./types/task');
const Choice = require('./types/choice');

/**
 * 
 * @param {Object} currentState Current state
 * @param {Object} payload State payload
 * @param {Object} options Custom options
 * @param {Function} Interpreter Interpreter function for parallel jobs only
 * 
 * @returns {Object|null}
 */
const StepInterpreter = async (currentState, payload, options, Interpreter) => {
  try {
    if(!currentState) return null;

    switch(currentState.type) {
      case 'task':
        if(currentState.result) return currentState.result;
        if(currentState.resolver) {
          let result = await Task(currentState.resolver, payload, options);
          return {
            result,
            nextState: currentState.next || null
          };
        }
      case 'choice':
        if(!currentState.choices) throw new Error('Missing key "choices" for choice type');
        for(let i in currentState.choices) {
          let condition = currentState.choices[i];
          // If case == else...
          if(condition.else && condition.next) {
            return {
              // Pass the same payload
              result: payload,
              nextState: condition.next
            }
          }

          let result = Choice(condition, payload, options);
          if(result && condition.next) {
            return {
              // Pass the same payload
              result: payload,
              nextState: condition.next
            }
          } 
        }
      case 'parallel':
        if(!currentState.branches) throw new Error('Missing key "branches" for parallel type');
        
        // No nested parallel
        let nestedParallel = false;

        for(let b of currentState.branches) {
          Object.keys(b.states).map(state => {
            if(b.states[state].type === 'parallel') {
              nestedParallel = true;
            }
          })
        }

        if(nestedParallel) throw new Error('Error nested parallel is forbidden');

        // Any task should pop a new process through the worker
        await Promise.all(currentState.branches.map(branch => Interpreter(branch.states, branch.startAt, payload)));

        if(currentState.next) {
          return {
            nextState: currentState.next
          }
        }
    }

    // Default value
    return null;
  }
  catch(error) {
    throw error;
  }
}

module.exports = StepInterpreter;