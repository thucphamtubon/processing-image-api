import app from '../index';
import supertest from 'supertest';
import { createThumbnailImage } from '../utils/image-handle';

const request = supertest(app);

describe('for test image api', () => {
  describe('path: /api/image', () => {
    it(`wrong image name`, async () => {
      const thumbnailImage = await createThumbnailImage({
        height: '500',
        width: '500',
        fileName: 'wrong'
      });

      expect(thumbnailImage).not.toBeNull();
    });

    it(`wrong width`, async () => {
      const thumbnailImage = await createThumbnailImage({
        height: '500',
        width: '-500',
        fileName: 'icelandwaterffullSize'
      });

      expect(thumbnailImage).not.toBeNull();
    });

    it(`wrong height:`, async () => {
      const thumbnailImage = await createThumbnailImage({
        height: '-500',
        width: '500',
        fileName: 'icelandwaterffullSize'
      });

      expect(thumbnailImage).not.toBeNull();
    });
  });
});
