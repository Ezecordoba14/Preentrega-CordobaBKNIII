import express from 'express';
import mongoose, { version } from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import dotenvConfig from './config/dotenv.config.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swagger from './utils/swagger.js';

const app = express();
const PORT = dotenvConfig.port;
const URL_MONGO = dotenvConfig.mongoUrl
const connection = mongoose.connect(`${URL_MONGO}`)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);
swagger(app)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))


export default app;