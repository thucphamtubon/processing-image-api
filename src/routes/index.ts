import express from 'express';
import imageApi from './image-api';

const routes = express.Router();

routes.use('/api/image', imageApi);

routes.get('/', (request, response) => {
  response.send(
    `
    <h1>Image Processing API</h1>
    <p>Images:
      <ul>
        <li><a href='/api/image?fileName=fjord' target='_blank'>fjord.jpg</a></li>
        <li><a href='/api/image?fileName=fjord&width=400&height=400' target='_blank'>fjord.jpg 400px x 400px</a></li>
        <li><a href='/api/image?fileName=encenadaport' target='_blank'>encenadaport.jpg</a></li>
        <li><a href='/api/image?fileName=encenadaport&width=400&height=400' target='_blank'>encenadaport.jpg 400px x 400px</a></li>
        <li><a href='/api/image?fileName=icelandwaterfall' target='_blank'>icelandwaterfall.jpg</a></li>
        <li><a href='/api/image?fileName=icelandwaterfall&width=400&height=400' target='_blank'>icelandwaterfall.jpg 400px x 400px</a></li>
        <li><a href='/api/image?fileName=palmtunnel' target='_blank'>palmtunnel.jpg</a></li>
        <li><a href='/api/image?fileName=palmtunnel&width=400&height=400' target='_blank'>palmtunnel.jpg 400px x 400px</a></li>
        <li><a href='/api/image?fileName=santamonica' target='_blank'>santamonica.jpg</a></li>
        <li><a href='/api/image?fileName=santamonica&width=400&height=400' target='_blank'>santamonica.jpg 400px x 400px</a></li>
      </ul>
    </p>
`
  );
});

export default routes;
