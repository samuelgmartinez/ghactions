const core = require('@actions/core');
const publisher = require('./publisher');

const environments = {
  'local': {
    baseUrl: 'http://localhost:4572',
    bucketName: 'demo-bucket',
    basePath: '/local'
  },
  'des': {
    baseUrl: 'http://localhost:4572',
    bucketName: 'demo-bucket',
    basePath: '/des'
  },
  'pre': {
    baseUrl: 'http://localhost:4572',
    bucketName: 'demo-bucket',
    basePath: '/pre'
  },
  'preint': {
    baseUrl: 'http://localhost:4572',
    bucketName: 'demo-bucket',
    basePath: '/preint'
  }
}

async function run() {
  try {
    const env = core.getInput('environment')
    const tenant = core.getInput('tenant');
    const s3env = environments[env];

    const path = core.getInput('subjects-path')
    const pathExpr = `${process.cwd()}/${path}/${tenant}/**/*.json`

    if (!(env  in environments)) {
      core.setFailed(`Specified env ${env} is not a valid value. Please refer to the documentation for the valid environment values`);
      return;
    }

    console.log(`Publishing subjects in ${env} for tenant ${tenant} using ${pathExpr} expression...`);

    console.log('Credentials: ' + core.getInput(`${env}-access-key`) + ' - ' + core.getInput(`${env}-secret-key`));

    const s3config = {
      accessKey: core.getInput(`${env}-access-key`),
      secretKey: core.getInput(`${env}-secret-key`),
      baseUrl: s3env.baseUrl,
      bucket: s3env.bucketName,
      basePath: s3env.basePath
    }

    const result = await publisher.publish(pathExpr, s3config, core.getInput('owner'), core.getInput('force') == 'true');
  } catch (error) {
    console.log(`An error occurred publishing the schemas: ${error.message}`);
    core.setFailed(error.message);
  }
}

run();