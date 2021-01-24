import RESPONSE_MESSAGES from 'constants/responseMessages';
import ServerResponse from 'helpers/ServerResponse';

/**
     * @description the app ues a general global exception handler
     * @param {object} res - response body
     * @param {object} error - the error object
     * @returns {Error} - object representing response response
     */
const selectError = (res, error) => {
  let errorToDisplay;
  const { name, data } = error;
  let { message } = error;
  switch (name) {
  case 'ValidationError':
    errorToDisplay = 'badRequest';
    break;

  case ('SyntaxError'):
    errorToDisplay = 'badRequest';
    message = RESPONSE_MESSAGES.INVALID_JSON;
    break;

  default:
    message = RESPONSE_MESSAGES.SOMETHING_WENT_WRONT;
    errorToDisplay = 'serverError';
  }

  return ServerResponse[errorToDisplay](res, message, data);
};

export default selectError;
