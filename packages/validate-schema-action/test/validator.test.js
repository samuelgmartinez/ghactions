const {describe, it} = require('mocha');
const {expect} = require('chai');
const {validate} = require('../validator')

describe('Simple folder crawling with valid schemas', function() {
  const pathPrefix = 'test-data/simple-valid-subjects';
  const result = validate(pathPrefix + '/**/*.json');

  it('must parse all schemas available', function() {    
    result.parsedSchemas.sort();

    expect(result.parsedSchemas).to.eql(
      [
        pathPrefix + '/another_json_schema.json',
        pathPrefix + '/json_schema.json',
      ]
    );
  });

  it('must validate all schemas successfully', function() {    
    result.successfulSchemas.sort()
    expect(result.successfulSchemas).to.eql(
      [
        pathPrefix + '/another_json_schema.json',
        pathPrefix + '/json_schema.json',
      ]
    );
  });

  it('must not fail to validate any schema', function() {    
    result.failedSchemas.sort()
    expect(result.failedSchemas).to.be.empty;
  });
});

describe('Complex folder crawling with valid schemas', function() {
  const pathPrefix = 'test-data/complex-valid-subjects';

  const result = validate(pathPrefix + '/**/*.json');

  it('must parse all schemas available', function() {    
    result.parsedSchemas.sort();

    expect(result.parsedSchemas).to.eql(
      [
        pathPrefix + '/a_subject/another_json_schema.json',
        pathPrefix + '/a_subject/json_schema.json',
        pathPrefix + '/another_subject/json_schema.json',
      ]
    );
  });

  it('must validate all schemas successfully', function() {    
    result.successfulSchemas.sort()
    expect(result.successfulSchemas).to.eql(
      [
        pathPrefix + '/a_subject/another_json_schema.json',
        pathPrefix + '/a_subject/json_schema.json',
        pathPrefix + '/another_subject/json_schema.json',
      ]
    );
  });

  it('must not fail to validate any schema', function() {    
    result.failedSchemas.sort()
    expect(result.failedSchemas).to.be.empty;
  });
});

describe('Complex folder crawling with mixed schemas', function() {
  const pathPrefix = 'test-data/complex-invalid-subjects';

  const result = validate(pathPrefix + '/**/*.json');

  it('must parse all schemas available', function() {    
    result.parsedSchemas.sort();

    expect(result.parsedSchemas).to.eql(
      [
        pathPrefix + '/a_subject/json_schema.json',
        pathPrefix + '/another_subject/invalid_format_json_schema.json',
        pathPrefix + '/another_subject/invalid_json_schema.json',
      ]
    );
  });

  it('must validate all valid schemas successfully', function() {    
    result.successfulSchemas.sort()
    expect(result.successfulSchemas).to.eql(
      [
        pathPrefix + '/a_subject/json_schema.json',
      ]
    );
  });

  it('must fail to validate invalid schemas', function() {    
    result.failedSchemas.sort()
    expect(result.failedSchemas).to.eql(
      [
        pathPrefix + '/another_subject/invalid_format_json_schema.json',
        pathPrefix + '/another_subject/invalid_json_schema.json',
      ]
    );
  });
});