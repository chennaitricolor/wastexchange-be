const request = require('supertest');
const server = require('../index');

describe('health endpoint test', () => {
  test('It should send health status', async (done) => {
    request(server)
      .get('/health')
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
