const core = require('@actions/core');
const validator = require('validator')

try {
  const result = validator.validate(core.getInput('subjects-path') + '/**/*.json')

  core.setOutput('parsed-schemas', result.parsedSchemas);

  if (result.successfulSchemas.length) {
    core.setOutput('successful-schemas', result.successfulSchemas);
  }

  if (result.failedSchemas.length) {
    core.setFailed("Some json schema validations have failed. See the logs for more information.");
    core.setOutput('failed-schemas', result.failedSchemas);
  }
} catch (error) {
  core.setFailed(error.message);
}