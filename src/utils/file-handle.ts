import path from 'path';
import { promises as fs } from 'fs';
import { getFileNameWithSize } from './get-file-name-with-size';
import { getFullImagePath, getThumbImagePath } from './get-image-path';
import { sharpResizeImage } from './sharp-resize-image';

interface ImageQuery {
  height?: string;
  width?: string;
  fileName?: string;
}

export const fullImagesPath = path.resolve(
  __dirname,
  '../../assets/images/full'
);
export const thumbImagesPath = path.resolve(
  __dirname,
  '../../assets/images/thumb'
);

export const getImagePath = async (
  params: ImageQuery
): Promise<null | string> => {
  const { fileName, width, height } = params;
  if (!fileName) return null;

  const newFileName = getFileNameWithSize(params);
  const isSize = !!(width && height);

  const filePath: string = isSize
    ? getThumbImagePath(newFileName)
    : getFullImagePath(newFileName);

  try {
    await fs.access(filePath);

    return filePath;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const getAvailableFullImageNames = async (): Promise<string[]> => {
  try {
    const fullImages = await fs.readdir(fullImagesPath);

    return fullImages.map((fileName: string): string => {
      const splittedFileNameList = fileName.split('.');

      return splittedFileNameList[0];
    });
  } catch {
    return [];
  }
};

export const checkAvailableFullImage = async (
  fileName?: string
): Promise<boolean> => {
  if (!fileName) return false;

  const availableImageNames = await getAvailableFullImageNames();

  return availableImageNames.includes(fileName);
};

export const getAvailableThumbImageNames = async (): Promise<string[]> => {
  try {
    const thumbImages = await fs.readdir(thumbImagesPath);

    return thumbImages.map((fileName: string): string => {
      const splittedFileNameList = fileName.split('.');

      return splittedFileNameList[0];
    });
  } catch {
    return [];
  }
};

export const checkAvailableThumbImage = async (
  params: ImageQuery
): Promise<boolean> => {
  const { fileName, width, height } = params;

  if (!fileName || !width || !height) return false;

  const newFileName = getFileNameWithSize(params);
  const filePath: string = getThumbImagePath(newFileName);

  try {
    await fs.access(filePath);

    return true;
  } catch {
    return false;
  }
};

export const createThumbImage = async (
  params: ImageQuery
): Promise<null | string> => {
  const { fileName, width, height } = params;

  if (!fileName || !width || !height) return null;

  const fullImageName = `${fileName}.jpg`;
  const fullImageFilePath = getFullImagePath(fullImageName);

  const thumbImageName = getFileNameWithSize(params);
  const thumbImageFilePath = getThumbImagePath(thumbImageName);

  return await sharpResizeImage({
    source: fullImageFilePath,
    target: thumbImageFilePath,
    width: +width,
    height: +height
  });
};
