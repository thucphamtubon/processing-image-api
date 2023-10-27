import path from 'path';
import { fullImagesPath, thumbImagesPath } from './file-handle';

export const getFullImagePath = (fileName: string) => {
  return path.resolve(fullImagesPath, fileName);
};

export const getThumbImagePath = (fileName: string) => {
  return path.resolve(thumbImagesPath, fileName);
};
