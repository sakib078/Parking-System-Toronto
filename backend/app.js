import express from 'express';
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

import parkingRoutes from './routes/parkingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.set('port', process.env.PORT || 4242);

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));



// app.use('/', (req, res) => {
  
//   res.send('Hello world');
   
// })

app.use('/admin', adminRoutes);
app.use('/park', parkingRoutes);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(app.get('port'), async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.4twp21v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Connected to MongoDB successfully');
    console.log(`Server running on port http://localhost:${app.get('port')}/`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});