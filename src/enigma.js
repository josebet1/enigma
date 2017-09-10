import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import rootRouter from './routes';

const corsOptions = { optionsSuccessStatus: 200 };

const app = express();

app.use(cookieParser())
app.use(bodyParser.json({ limit: '100mb' }));

app.use('/', cors(corsOptions), rootRouter);

export default app;
