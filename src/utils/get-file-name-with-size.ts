import { ImageQuery } from '../../types/ImageQuery';

export const getFileNameWithSize = (params: ImageQuery) => {
  const { fileName, width, height } = params;
  const isSize = !!(width && height);

  return isSize ? `${fileName}-${width}x${height}.jpg` : `${fileName}.jpg`;
};
