import path from 'path';
import { fullSizeImagePath, thumbnailImagePath } from './image-handle';

export const getFullSizeImagePath = (fileName: string) => {
  return path.resolve(fullSizeImagePath, fileName);
};

export const getThumbnailImagePath = (fileName: string) => {
  return path.resolve(thumbnailImagePath, fileName);
};
