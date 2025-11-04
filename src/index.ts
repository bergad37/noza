import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import ResponseTime from 'response-time';
import cors from 'cors';
import { AppDataSource } from './data-source.ts';
import authRoute from './routes/auth.route.ts';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(ResponseTime());

app.get('/', (req, res) => {
  res.send('Server up and is running');
});

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });


app.use('/api/auth', authRoute);
