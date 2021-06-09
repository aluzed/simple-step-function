
# Simple Step Function

Here is a simple step function-like framework that you can host. Each step generates a synchronous thread and return the result as a payload to the next step. You can return a result directly or a resolver if you want to create your custom function.

## Supported types

* task
* choice
* parallel (nested parallel is forbidden)

See examples in jobs folder.


## Config file


In `jobs` folder, create a subfolder with a `config.json` file : 

```json
{
  "startAt": "first_step",
  "states": {
    "first_step":{
      "type": "task",
      "result": "first",
      "next": "second_step"
    },
    "second_step":{
      "type": "task",
      "result": "second"
    }
  }
}
```


## Resolver file

In your custom job folder (ex : `jobs/myjob`), create a  `functions` folder, then add your js script : 

```javascript
// Optional
exports.timeout = 6000;

// Required
exports.handler = async (payload) => {
  try {
    ...

    // payload
    return {
      result: '1234'
    }
  }
  catch(err) {
    throw err;
  }
}
```


## CLI

To exec from cli tool

```terminal
node cli/exec.js task01
node cli/exec.js task02
...
```