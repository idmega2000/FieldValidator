import Joi from 'joi';
import ExceptionError from 'helpers/ExceptionHandler/ExceptionError';
import { REQUIRED_CONDITION } from 'constants/constant';
import RESPONSE_MESSAGES from 'constants/responseMessages';

/**
* @description class will implement functionalities for Validations
*
* @class SchemaValidation
*/
class SchemaValidation {
  /**
     * @description validate the request body
     * @param {object} req - Request sent to the route
     * @param {object} res - Response sent from the controller
     * @param {object} next - Error handler
     * @returns {object} - object representing response message
     */
  static validateRuleDataSchema(req, res, next) {
    const schema = Joi.object({
      rule: Joi.object().keys({
        field: Joi.string().required().messages({
          'string.base': RESPONSE_MESSAGES.FIELD_IS_STRING,
          'string.empty': RESPONSE_MESSAGES.FIELD_REQUIRED,
          'any.required': RESPONSE_MESSAGES.FIELD_REQUIRED
        }),
        condition: Joi.string()
          .valid(...REQUIRED_CONDITION).required().messages({
            'string.base': RESPONSE_MESSAGES.CONDITION_STRING,
            'string.empty': RESPONSE_MESSAGES.CONDITION_REQUIRED,
            'any.required': RESPONSE_MESSAGES.CONDITION_REQUIRED,
            'any.only': RESPONSE_MESSAGES.CONDITION_CONTAIN
          }),
        condition_value: Joi.required().messages({
          'any.required': RESPONSE_MESSAGES.COND_VALUE_REQUIRED
        }),
      }).required().messages({
        'object.base': RESPONSE_MESSAGES.RULE_NOT_OBJECT,
        'any.required': RESPONSE_MESSAGES.RULE_REQUIRED,
        'string.empty': RESPONSE_MESSAGES.RULE_REQUIRED
      }),
      data: Joi.alternatives(
        Joi.string(),
        Joi.object(),
        Joi.array().items(Joi.string()),
      ).required().messages({
        'alternatives.types': RESPONSE_MESSAGES.DATA_TYPES,
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
      throw new ExceptionError(error.message);
    }
    return next();
  }
}

export default SchemaValidation;
