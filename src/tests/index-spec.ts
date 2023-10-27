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
    const successPath = '/api/image?fileName=icelandwaterffullSize';
    const successThumbnailPath =
      '/api/image?fileName=icelandwaterffullSize&width=300&height=300';
    const failedPath = '/api/image2?fileName=icelandwaterffullSize';

    it(`success get: ${successPath}`, async () => {
      const res = await request.get(successPath);

      expect(res.status).toBe(200);
    });

    it(`success get: ${successThumbnailPath}`, async () => {
      const res = await request.get(successThumbnailPath);

      expect(res.status).toBe(200);
    });

    it(`failed get: ${failedPath}`, async () => {
      const res = await request.get(failedPath);

      expect(res.status).toBe(404);
    });
  });
});
