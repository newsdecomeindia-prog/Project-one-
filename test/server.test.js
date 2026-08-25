const test = require('node:test');
const assert = require('node:assert');
const app = require('../index.js');

test('GET / returns 200 and running status', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.message, 'Express server is running');
    assert.ok(body.timestamp);
  } finally {
    server.close();
  }
});

test('GET /api/test returns 200 and test message', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/api/test`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.message, 'Test route is working properly');
  } finally {
    server.close();
  }
});
