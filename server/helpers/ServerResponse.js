/**
* @description class will implement functionalities for all server responses
*
* @class HomeController
*/
class ServerResponse {
/**
 * @description - for formating response
 * @param {object} res the response object
 * @param {string} message The message to the client
 * @param {object} data the data to from the activity
 * @param {Number} statusCode the status code to be sent to user
 * @param {String} status the status of the event
 * @param {boolean} logResponse bool to log the response or not
 * @returns {object} returns response object with the necessary info
 */
  static SuccessResponse(res, message, data, statusCode = 200,
    status = 'success') {
    res.status(statusCode).json({
      message,
      status,
      data,
    });
  }

  /**
   * @description - for formating response
   * @param {object} res the response object
   * @param {string} message The message to the client
   * @param {Number} statusCode the status code to be sent to user
   * @param {object} data the data to from the activity
   * @param {String} status the status of the event
   * @param {boolean} logResponse bool to log the response or not
   * @returns {object} returns response object with the necessary info
   */
  static FailureResponse(res, message, statusCode = 400, data = null,
    status = 'error') {
    res.status(statusCode).json({
      message,
      status,
      data,
    });
  }
}

export default ServerResponse;
