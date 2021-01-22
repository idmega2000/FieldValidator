import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import v1Routes from 'routes';
import envData from './configs/envData';

dotenv.config();

Sentry.init({
  dsn: envData.SENTRY_DSN,
  environment: envData.NODE_ENV
});

const app = express();

app.use(Sentry.Handlers.requestHandler());

const corsOptions = {
  credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json({
  limit: envData.MAX_FILE_SIZE || '5mb',
}));

app.use(v1Routes);

app.use(Sentry.Handlers.errorHandler());

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/* eslint-disable-next-line */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({

    errors: {
      message: err,
    },
  });
});

/* eslint-disable-next-line */
app.listen(envData.PORT, () => console.log(`App Listening on port ${envData.PORT}`));
export default app;
