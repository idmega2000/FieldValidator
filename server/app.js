import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import routes from 'routes';
import ServerResponse from 'helpers/ServerResponse';
import RESPONSE_MESSAGES from 'constants/responseMessages';
import selectError from 'helpers/ExceptionHandler/selectError';
import envData from './configs/envData';

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

app.use(routes);

app.use(Sentry.Handlers.errorHandler());

// / catch 404 and return the error message
app.use((req, res, next) => ServerResponse.notFound(res, RESPONSE_MESSAGES.NOT_FOUND));

// Handle error thrown or not handled by app
app.use((error, req, res, next) => selectError(res, error)
  // iclulde logging and error catch with sentry
  // log the error if log is available using the err
  // Also find way to display the error in console when on dev
  // You can also use online app error monitoring like sentry
);

/* eslint-disable-next-line */
app.listen(envData.PORT, () => console.log(`App Listening on port ${envData.PORT}`));
export default app;
