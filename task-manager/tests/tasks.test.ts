import request from 'supertest';
import { app }  from './app'; // ton fichier où tu déclares `const app = express()`

describe('GET /tasks', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
