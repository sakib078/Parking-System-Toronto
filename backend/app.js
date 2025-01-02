import express from 'express';
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import parkingRoutes from './routes/parkingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.set('port', process.env.PORT || 4242);

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

app.use('/admin', adminRoutes);
app.use('/park', parkingRoutes);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(app.get('port'), async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.4twp21v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Connected to MongoDB successfully');
    console.log(`Server running on port ${app.get('port')}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});