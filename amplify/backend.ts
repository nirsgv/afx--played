import { defineBackend } from '@aws-amplify/backend';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { api } from './functions/api/resource';

const backend = defineBackend({ api });

// Public HTTPS endpoint for the read-only API. Amplify Hosting proxies
// https://afx-played.info/api/* to it, so the browser never calls it directly.
const apiUrl = backend.api.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
});

backend.addOutput({
  custom: { apiUrl: apiUrl.url },
});
