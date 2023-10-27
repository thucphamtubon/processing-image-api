import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('For test connection', () => {
  describe('path: /', () => {
    it('get: /', async () => {
      const res = await request.get('/');

      expect(res.status).toBe(200);
    });
  });

  describe('path: /api/image', () => {
    const successPath = '/api/image?fileName=icelandwaterfall';
    const successThumbPath =
      '/api/image?fileName=icelandwaterfall&width=300&height=300';
    const failedPath = '/api/image2?fileName=icelandwaterfall';

    it(`success get: ${successPath}`, async () => {
      const res = await request.get(successPath);

      expect(res.status).toBe(200);
    });

    it(`success get: ${successThumbPath}`, async () => {
      const res = await request.get(successThumbPath);

      expect(res.status).toBe(200);
    });

    it(`failed get: ${failedPath}`, async () => {
      const res = await request.get(failedPath);

      expect(res.status).toBe(404);
    });
  });
});
