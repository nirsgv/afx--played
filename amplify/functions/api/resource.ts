import { defineFunction, secret } from '@aws-amplify/backend';

export const api = defineFunction({
  name: 'api',
  entry: './handler.ts',
  runtime: 24,
  memoryMB: 512,
  timeoutSeconds: 15,
  environment: {
    // Set with: npx ampx sandbox secret set DATABASE (sandbox)
    // or in the Amplify console → Hosting → Secrets (deployed branches).
    DATABASE: secret('DATABASE'),
  },
});
