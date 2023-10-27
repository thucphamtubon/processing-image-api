import sharp from 'sharp';

interface SharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

export const sharpResizeImage = async (
  props: SharpResizeParams
): Promise<null | string> => {
  try {
    const { width, target, height, source } = props;

    await sharp(source).resize(width, height).toFormat('jpeg').toFile(target);

    return null;
  } catch (e) {
    return JSON.stringify(e);
  }
};
