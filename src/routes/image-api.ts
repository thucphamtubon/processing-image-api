import express from 'express';
import {
  checkAvailableFullImage,
  checkAvailableThumbImage,
  createThumbImage,
  getImagePath
} from '../utils/image-handle';
import { ImageQuery } from '../../types/ImageQuery';

const imageRouter: express.Router = express.Router();

const validateImageQuery = async (
  imageQuery: ImageQuery
): Promise<null | string> => {
  const { width, height, fileName } = imageQuery;

  const isAvailableFullImage = await checkAvailableFullImage(fileName);
  if (!isAvailableFullImage) {
    return `Wrong image names`;
  }

  if (!width && !height) return null;

  const widthValue = +(width || '');
  if (Number.isNaN(widthValue) || widthValue < 1) {
    return 'Please input a positive numerical value for width.';
  }

  const heightValue = +(height || '');
  if (Number.isNaN(heightValue) || heightValue < 1) {
    return 'Please input a positive numerical value for height.';
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

  if (!(await checkAvailableThumbImage(query))) {
    error = await createThumbImage(query);
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
