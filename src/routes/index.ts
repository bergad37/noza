import express from 'express';
import { AuthRouter } from './authRoute.ts';

const ApiRouter = express.Router();

AuthRouter(ApiRouter);

export default ApiRouter;
