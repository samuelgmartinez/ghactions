const core = require('@actions/core');
const publisher = require('./publisher')

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

    const s3config = {
      accessKey: core.getInput(`${env}-access-key`),
      secretKey: core.getInput(`${env}-secret-key`),
      baseUrl: s3env.baseUrl,
      bucket: s3env.bucketName,
      basePath: s3env.basePath
    }

    const path = core.getInput('subjects-path')
    const pathExpr = `${process.cwd()}/${path}/${tenant}/**/*.json`
    console.log(`Publishing subjects using ${pathExpr} expression...`);

    return publisher.publish(core.getInput('subjects-path') + '/**/*.json', 
      s3config, core.getInput('owner'), core.getInput('force') == 'true');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();