import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createContactHandler } from '../lib/contact.ts';

const valid = { name: 'Cliente Teste', email: 'cliente@example.com', phone: '(93) 99999-9999', message: 'Gostaria de um orçamento para meu projeto.' };
const env = { RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'site@example.com', CONTACT_TO_EMAIL: 'empresa@example.com' };
const request = (body = valid, headers = {}) => new Request('http://localhost/api/contact', {
  method: 'POST', headers: { 'content-type': 'application/json', ...headers },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});

test('rejects malformed JSON, missing fields and invalid data without sending', async () => {
  const handler = createContactHandler({ env, fetcher: () => { throw new Error('must not send'); } });
  for (const data of ['{', {}, null, [], { ...valid, name: ' ' }, { ...valid, email: 'invalid' }, { ...valid, phone: '123' }, { ...valid, message: 'short' }, { ...valid, name: 4 }, { ...valid, website: 'spam' }]) {
    assert.equal((await handler(request(data))).status, 400);
  }
});
test('rejects foreign origins and incorrect content types', async () => {
  const handler = createContactHandler({ env: {} });
  assert.equal((await handler(request(valid, { origin: 'https://other.example' }))).status, 403);
  assert.equal((await handler(request(valid, { 'content-type': 'text/plain' }))).status, 415);
});
test('limits bodies even without content-length', async () => {
  const handler = createContactHandler();
  assert.equal((await handler(request('x'.repeat(20_000)))).status, 413);
  assert.equal((await handler(request(valid, { 'content-length': '20000' }))).status, 413);
});
test('missing credentials never return success', async () => {
  assert.equal((await createContactHandler({ env: {} })(request())).status, 503);
});
test('success requires provider confirmation and uses visitor only as reply-to', async () => {
  let sent;
  const handler = createContactHandler({ env, fetcher: async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    sent = JSON.parse(options.body);
    return Response.json({ id: 'test-message' });
  } });
  assert.equal((await handler(request())).status, 200);
  assert.equal(sent.from, env.CONTACT_FROM_EMAIL);
  assert.deepEqual(sent.to, [env.CONTACT_TO_EMAIL]);
  assert.equal(sent.reply_to, valid.email);
  assert.ok(sent.text.includes(valid.message));
});
test('provider refusal, missing confirmation and connection failure return 502', async () => {
  for (const fetcher of [async () => new Response('', { status: 429 }), async () => Response.json({}), async () => { throw new Error('timeout'); }]) {
    assert.equal((await createContactHandler({ env, fetcher })(request())).status, 502);
  }
});
test('limits attempts and allows retry when the time window expires', async () => {
  let time = 0;
  const handler = createContactHandler({ env: { CONTACT_TRUST_PROXY: 'true' }, now: () => time });
  for (let i = 0; i < 5; i++) assert.equal((await handler(request(valid, { 'x-forwarded-for': '192.0.2.1' }))).status, 503);
  const limited = await handler(request(valid, { 'x-forwarded-for': '192.0.2.1' }));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '60');
  time = 60_001;
  assert.equal((await handler(request(valid, { 'x-forwarded-for': '192.0.2.1' }))).status, 503);
});
