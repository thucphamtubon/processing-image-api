import path from 'path';
import { promises as fs } from 'fs';
import { getFileNameWithSize } from './get-file-name-with-size';
import { getFullSizeImagePath, getThumbnailImagePath } from './get-image-path';
import { sharpResizeImage } from './sharp-resize-image';

interface ImageQuery {
  height?: string;
  width?: string;
  fileName?: string;
}

export const fullSizeImagePath = path.resolve(
  __dirname,
  '../../assets/images/full-size'
);
export const thumbnailImagePath = path.resolve(
  __dirname,
  '../../assets/images/thumbnailnail'
);

export const getImagePath = async (
  params: ImageQuery
): Promise<null | string> => {
  const { fileName, width, height } = params;
  if (!fileName) return null;

  const newFileName = getFileNameWithSize(params);
  const isSize = !!(width && height);

  const filePath: string = isSize
    ? getThumbnailImagePath(newFileName)
    : getFullSizeImagePath(newFileName);

  try {
    await fs.access(filePath);

    return filePath;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const getAvailableFullSizeImageNames = async (): Promise<string[]> => {
  try {
    const fullSizeImages = await fs.readdir(fullSizeImagePath);

    return fullSizeImages.map((fileName: string): string => {
      const splittedFileNameList = fileName.split('.');

      return splittedFileNameList[0];
    });
  } catch {
    return [];
  }
};

export const checkAvailableFullSizeImage = async (
  fileName?: string
): Promise<boolean> => {
  if (!fileName) return false;

  const availableImageNames = await getAvailableFullSizeImageNames();

  return availableImageNames.includes(fileName);
};

export const getAvailableThumbnailImageNames = async (): Promise<string[]> => {
  try {
    const thumbnailImages = await fs.readdir(thumbnailImagePath);

    return thumbnailImages.map((fileName: string): string => {
      const splittedFileNameList = fileName.split('.');

      return splittedFileNameList[0];
    });
  } catch {
    return [];
  }
};

export const checkAvailableThumbnailImage = async (
  params: ImageQuery
): Promise<boolean> => {
  const { fileName, width, height } = params;

  if (!fileName || !width || !height) return false;

  const newFileName = getFileNameWithSize(params);
  const filePath: string = getThumbnailImagePath(newFileName);

  try {
    await fs.access(filePath);

    return true;
  } catch {
    return false;
  }
};

export const createThumbnailImage = async (
  params: ImageQuery
): Promise<null | string> => {
  const { fileName, width, height } = params;

  if (!fileName || !width || !height) return null;

  const fullSizeImageName = `${fileName}.jpg`;
  const fullSizeImageFilePath = getFullSizeImagePath(fullSizeImageName);

  const thumbnailImageName = getFileNameWithSize(params);
  const thumbnailImageFilePath = getThumbnailImagePath(thumbnailImageName);

  return await sharpResizeImage({
    source: fullSizeImageFilePath,
    target: thumbnailImageFilePath,
    width: +width,
    height: +height
  });
};
