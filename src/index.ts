import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3003;

app.use(routes);

app.listen(port, async (): Promise<void> => {
  console.log(`You are listening http://localhost:${port}`);
});

export default app;
