import RESPONSE_MESSAGES from 'constants/responseMessages';
import ServerResponse from 'helpers/ServerResponse';
import { getOwnerInfo } from 'helpers/mockdata';

/**
* @description class will implement functionalities for Home
*
* @class HomeController
*/
class HomeController {
  /**
     * @description view home route
     * @param {object} req - Request sent to the route
     * @param {object} res - Response sent from the controller
     * @param {object} next - Error handler
     * @returns {object} - object representing response message
     */
  static async viewHome(req, res, next) {
    try {
      const ownerData = await getOwnerInfo();

      return ServerResponse.SuccessResponse(res, RESPONSE_MESSAGES.HOME_SUCCESS, ownerData);
    } catch (error) {
      return next(error);
    }
  }
}

export default HomeController;
