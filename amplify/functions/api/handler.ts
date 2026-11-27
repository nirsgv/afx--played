import type { LambdaFunctionURLHandler, LambdaFunctionURLResult } from 'aws-lambda';
import mongoose from 'mongoose';
import { env } from '$amplify/env/api';
import queries from '../../../api/queries.js';

// Reuse one connection across invocations of a warm Lambda container.
let connection: Promise<typeof mongoose> | undefined;
const connect = () =>
  (connection ??= mongoose
    .connect(env.DATABASE, { serverSelectionTimeoutMS: 5000 })
    .catch((err) => {
      connection = undefined;
      throw err;
    }));

const json = (statusCode: number, body: unknown, headers: Record<string, string> = {}): LambdaFunctionURLResult => ({
  statusCode,
  headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  body: JSON.stringify(body),
});

export const handler: LambdaFunctionURLHandler = async (event) => {
  if (event.requestContext.http.method !== 'GET') {
    return json(405, { error: 'Method not allowed' }, { allow: 'GET' });
  }

  const run = queries.matchRoute(event.rawPath);
  if (!run) return json(404, { error: 'Not found' });

  try {
    await connect();
    // The data changes rarely; let browsers and the CDN cache it briefly.
    return json(200, await run(), { 'cache-control': 'public, max-age=300' });
  } catch (err) {
    console.error('API error', event.rawPath, err);
    return json(500, { error: 'Internal error' });
  }
};
