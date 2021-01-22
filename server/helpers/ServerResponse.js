import RESPONSE_MESSAGES from "constants/responseMessages";

/**
* @description class will implement functionalities for all server responses
*
* @class HomeController
*/
class ServerResponse {
/**
 * @description - for success ok
 * @param {object} res the response object
 * @param {string} message The message to the client
 * @param {object} data the data to from the activity
 * @param {Number} statusCode the status code to be sent to user
 * @param {String} status the status of the event
 * @returns {object} returns response object with the necessary info
 */
  static successOk(res, message, data, statusCode = 200,
    status = 'success') {
    res.status(statusCode).json({
      message,
      status,
      data,
    });
  }

  /**
   * @description - for not found 
   * @param {object} res the response object
   * @param {string} message The message to the client
   * @param {Number} statusCode the status code to be sent to user
   * @param {object} data the data to from the activity
   * @param {String} status the status of the event
   * @returns {object} returns response object with the necessary info
   */
  static notFound(res, message, statusCode = 404, data = null,
    status = 'error') {
    res.status(statusCode).json({
      message,
      status,
      data,
    });
  }
  /**
   * @description - for bad request
   * @param {object} res the response object
   * @param {string} message The message to the client
   * @param {Number} statusCode the status code to be sent to user
   * @param {object} data the data to from the activity
   * @param {String} status the status of the event
   * @returns {object} returns response object with the necessary info
   */
  static badRequest(res, message, data = null,
    status = 'error') {
    res.status(400).json({
      message,
      status,
      data,
    });
  }
  /**
   * @description - for internal server error
   * @param {object} res the response object
   * @param {string} message The message to the client
   * @param {Number} statusCode the status code to be sent to user
   * @param {object} data the data to from the activity
   * @param {String} status the status of the event
   * @returns {object} returns response object with the necessary info
   */
  static serverError(res, message=RESPONSE_MESSAGES.SOMETHING_WENT_WRONT, data = null,
    status = 'error') {
    res.status(500).json({
      message,
      status,
      data,
    });
  }
}

export default ServerResponse;
