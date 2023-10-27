import path from 'path';
import { fullImagesPath, thumbImagesPath } from './image-handle';

export const getFullImagePath = (fileName: string) => {
  return path.resolve(fullImagesPath, fileName);
};

export const getThumbImagePath = (fileName: string) => {
  return path.resolve(thumbImagesPath, fileName);
};
