import express from 'express';
import { readFile } from 'fs/promises';
import parkingRoutes from './routes/parkingRoutes.js';

const app = express();

app.set('port', process.env.PORT || 4242);

app.use('/park', parkingRoutes);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});

