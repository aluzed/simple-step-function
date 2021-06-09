
const TestCondition = (condition, payload) => {
  let variable = condition.variable;
  if(variable.match(/^\$\./)) {
    variable = payload[variable.replace(/^\$\./, '')];
  }

  let value = condition.value || '';
  if(value.toString().match(/^\$\./)) {
    value = payload[value.toString().replace(/^\$\./, '')];
  }

  switch(condition.operator) {
    case '==':
      return variable == value;
    case '!=':
      return variable != value;
    case '===':
      return variable === value;
    case '<':
      return variable < value;
    case '>':
      return variable > value;
    case '<=':
      return variable <= value;
    case '>=':
      return variable >= value;
    case 'isString':
      return typeof variable === 'string';
    case 'isNumber':
      return typeof variable === 'number';
    case 'isBoolean':
      return typeof variable === 'boolean';
    case 'isArray':
      return variable instanceof Array;
    case 'isTrue':
      return !!variable;
    case 'isFalse':
      return !variable;
    case 'isNull':
      return variable === null; 
  }
}

const HandleCondition = (condition, payload) => {
  let result = TestCondition(condition, payload);
  return (condition.not) ? !result : result;
}

module.exports = (condition, payload, config) => {

  if(condition.and) {
    let result = [];
    for(let c of condition.and) {
      result.push(HandleCondition(c, payload));
    }
    // Return false if at least 1 condition is false
    return (result.indexOf(false) < 0);
  }

  if(condition.or) {
    let result = [];
    for(let c of condition.or) {
      result.push(HandleCondition(c, payload));
    }
    // Return true if at least 1 condition is true
    return result.indexOf(true) > -1;
  }

  return HandleCondition(condition, payload);
}