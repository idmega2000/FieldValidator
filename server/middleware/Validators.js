import { CONDITION_TYPE } from 'constants/constant';
import ExceptionError from 'helpers/ExceptionHandler/ExceptionError';
import generalHelper from 'helpers/generalHelper';

/**
* @description class will implement functionalities for Validations
*
* @class Validators
*/
class Validators {
  /**
     * @description validate condition type mainly for nexted object
     * @param {object} req - Request sent to the route
     * @param {object} res - Response sent from the controller
     * @param {object} next - Error handler
     * @returns {object} - object representing response message
     */
  static validateCondtionType(req, res, next) {
    const { rule: { field, condition_value, condition }, data } = req.body;
    let message;
    const typeOfCondition = `${typeof condition_value}`;
    const typeOfDataField = `${typeof data[field]}`;
    const allowedTypes = CONDITION_TYPE[condition];

    if (!CONDITION_TYPE[condition].includes(typeOfCondition)) {
      message = `condition_value should be a ${allowedTypes.join(' or ')}.`;
    } // else if to make sure if it does not call the two statement

    else if (generalHelper.valueIsObject(data) && data[field]
    && typeOfCondition !== typeOfDataField) {
      message = `${data[field]} should be a ${typeOfCondition}`;
    }

    if (message) {
      throw new ExceptionError(message);
    }

    return next();
  }
}

export default Validators;
