const fs = require('fs')
const core = require('@actions/core');
const github = require('@actions/github');
const glob = require('glob')
const Ajv = require('ajv')

const ajv = new Ajv.default({allErrors: true})

try {
  const subjectsPath = core.getInput('subjects-path');

  const files = glob.sync(subjectsPath + '/**/*.json')
    .map(schemaPath => {
      console.log(`Validating schema definition: ${schemaPath}`);
      return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    })
    .forEach(schema => ajv.addSchema(schema));
  

  /*
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  */
} catch (error) {
  core.setFailed(error.message);
}