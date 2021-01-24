// implement a better error Handler

/**
* @description a general excetption handler
*
* @class ExceptionError
*/
class ExceptionError extends Error {
  /**
     * @description validate the request body
     * @param {string} message - message to be displayed
     * @param {object} data - data to show
     * @param {string} status - status
     * @param {number} statusCode - status code
     * @param {string} name - name
     * @param {string} user - user
     * @returns {Error} - object representing response error
     */
  constructor(message, data = null, status = 'error', statusCode = 400, name = 'ValidationError', user = {}) {
    super(message);
    this.name = name;
    this.status = status;
    this.data = data;
    this.message = message;
    this.dateTime = new Date();
    this.user = user;
    this.statusCode = statusCode;
  }
}
export default ExceptionError;
