import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import ResponseTime from 'response-time';
import cors from 'cors';
import { AppDataSource } from './data-source.ts';
import authRoute from './routes/auth.route.ts';
import userRoute from './routes/user.route.ts';
import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiOptions } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Logger } from './utils/winston.logger.ts';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(ResponseTime());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (): UploadApiOptions => ({
    folder: 'noza_files/images',
    allowed_formats: ['jpg', 'png', 'jpeg']
  })
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.send('Server up and is running');
});

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    Logger.info('Database connected');
    app.listen(PORT, () => Logger.info(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    Logger.info('Database connection error:', error);
  });

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.use('/api/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ url: req.file?.path });
  } catch (error: any) {
    throw new Error(error?.message);
  }
});
