import type { LambdaFunctionURLEvent, LambdaFunctionURLHandler, LambdaFunctionURLResult } from 'aws-lambda';
import mongoose from 'mongoose';
import { env } from '$amplify/env/api';
import queries from '../../../api/queries.js';
import contact from '../../../api/contact.js';

const MAX_BODY_BYTES = 16 * 1024;

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

const parseBody = (event: LambdaFunctionURLEvent): unknown => {
  const raw = event.body ?? '';
  const text = event.isBase64Encoded ? Buffer.from(raw, 'base64').toString('utf8') : raw;
  if (Buffer.byteLength(text) > MAX_BODY_BYTES) throw new RangeError('Body too large');
  return JSON.parse(text);
};

const postContact = async (event: LambdaFunctionURLEvent): Promise<LambdaFunctionURLResult> => {
  const noStore = { 'cache-control': 'no-store' };
  let body: unknown;
  try {
    body = parseBody(event);
  } catch {
    return json(400, { errors: { form: 'Invalid request' } }, noStore);
  }
  const db = (await connect()).connection.db;
  if (!db) throw new Error('No database connection');
  const [status, result] = await contact.handleContact(body, db);
  return json(status, result, noStore);
};

export const handler: LambdaFunctionURLHandler = async (event) => {
  const method = event.requestContext.http.method;

  try {
    if (method === 'POST' && event.rawPath === '/api/contact') return await postContact(event);

    if (method !== 'GET') {
      return json(405, { error: 'Method not allowed' }, { allow: 'GET' });
    }

    const run = queries.matchRoute(event.rawPath, event.queryStringParameters ?? {});
    if (!run) return json(404, { error: 'Not found' });

    await connect();
    // The data changes rarely; let browsers and the CDN cache it briefly.
    return json(200, await run(), { 'cache-control': 'public, max-age=300' });
  } catch (err) {
    console.error('API error', method, event.rawPath, err);
    return json(500, { error: 'Internal error' }, { 'cache-control': 'no-store' });
  }
};
