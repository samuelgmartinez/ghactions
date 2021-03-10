const publisher = require('../publisher');

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
    const env = 'des'
    const tenant = 'bk';
    const s3env = environments[env];

    const path = './test-data/complex-valid-subjects'
    const pathExpr = `${process.cwd()}/${path}/${tenant}/**/*.json`

    if (!(env  in environments)) {
      core.setFailed(`Specified env ${env} is not a valid value. Please refer to the documentation for the valid environment values`);
      return;
    }

    console.log(`Publishing subjects in ${env} for tenant ${tenant} using ${pathExpr} expression...`);

    const s3config = {
      accessKey: 'access',
      secretKey: 'secret',
      baseUrl: s3env.baseUrl,
      bucket: s3env.bucketName,
      basePath: s3env.basePath
    }

    await publisher.publish(pathExpr, s3config, 'theowner', true);
  } catch (error) {
    console.log(error.message);
  }
}

run();