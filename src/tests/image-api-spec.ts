import app from '../index';
import supertest from 'supertest';
import { createThumbImage } from '../utils/image-handle';

const request = supertest(app);

describe('for test image api', () => {
  describe('path: /api/image', () => {
    const successPath = '/api/image?fileName=icelandwaterfall';
    const successThumbPath =
      '/api/image?fileName=icelandwaterfall&width=300&height=300';

    it(`wrong image name: ${successPath}`, async () => {
      const thumbImage = await createThumbImage({
        height: '500',
        width: '500',
        fileName: 'wrong'
      });

      expect(thumbImage).not.toBeNull();
    });

    it(`wrong width: ${successPath}`, async () => {
      const thumbImage = await createThumbImage({
        height: '500',
        width: '-500',
        fileName: 'icelandwaterfall'
      });

      expect(thumbImage).not.toBeNull();
    });

    it(`wrong height: ${successPath}`, async () => {
      const thumbImage = await createThumbImage({
        height: '-500',
        width: '500',
        fileName: 'icelandwaterfall'
      });

      expect(thumbImage).not.toBeNull();
    });
  });
});
