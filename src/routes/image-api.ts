import express from 'express';
import {
  checkAvailableFullSizeImage,
  checkAvailableThumbnailImage,
  createThumbnailImage,
  getImagePath
} from '../utils/image-handle';
import { ImageQuery } from '../../types/ImageQuery';

const imageRouter: express.Router = express.Router();

const validateImageQuery = async (
  imageQuery: ImageQuery
): Promise<null | string> => {
  const { width, height, fileName } = imageQuery;

  const isAvailableFullSizeImage = await checkAvailableFullSizeImage(fileName);
  if (!isAvailableFullSizeImage) {
    return `Wrong image names`;
  }

  if (!width && !height) return null;

  const widthValue = +(width || '');
  if (Number.isNaN(widthValue) || widthValue < 1) {
    return 'Input positive numerical value for width.';
  }

  const heightValue = +(height || '');
  if (Number.isNaN(heightValue) || heightValue < 1) {
    return 'Input positive numerical value for height.';
  }

  return null;
};

imageRouter.get('/', async (request, response): Promise<void> => {
  const { query } = request;
  const validationMessage = await validateImageQuery(query);

  if (validationMessage) {
    response.send(validationMessage);

    return;
  }

  let error: null | string = '';

  if (!(await checkAvailableThumbnailImage(query))) {
    error = await createThumbnailImage(query);
  }

  if (error) {
    response.send(error);

    return;
  }

  const path = await getImagePath(query);

  if (path) response.sendFile(path);
  else response.send('Something wrong!');
});

export default imageRouter;
