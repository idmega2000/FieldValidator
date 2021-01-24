import ServerResponse from 'helpers/ServerResponse';

import ValidationService from 'services/ValidationService';

/**
* @description class will implement functionalities for Validation
*
* @class ValidationController
*/
class ValidationController {
  /**
     * @description validate the data
     * @param {object} req - Request sent to the route
     * @param {object} res - Response sent from the controller
     * @param {object} next - Error handler
     * @returns {object} - object representing response message
     */
  static validate(req, res, next) {
    try {
      const { rule, data } = req.body;
      const { field } = rule;

      const validationResultData = ValidationService.validateRuleService(
        rule,
        data
      );

      const message = `field ${field} successfully validated.`;
      return ServerResponse.successOk(res, message, validationResultData);
    } catch (error) {
      return next(error);
    }
  }
}

export default ValidationController;
