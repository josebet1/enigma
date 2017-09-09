import express from 'express';
import cors from 'cors';

import rootRouter from './routes';

const corsOptions = { optionsSuccessStatus: 200 };

const app = express();

app.use('/', cors(corsOptions), rootRouter);

export default app;
