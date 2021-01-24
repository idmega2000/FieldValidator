import generalHelper from 'helpers/generalHelper';
import ExceptionError from 'helpers/ExceptionHandler/ExceptionError';
import apiHelpers from 'helpers/apiHelpers';

const {
  valueIsArray, valueIsObject, valueIsString, valueIsInt,
  valueToInt
} = generalHelper;

const { generateValidationData, generateDataFieldValue } = apiHelpers;

/**
* @description class will implement functionalities for Validation service
*
* @class ValidationService
*/
class ValidationService {
  /**
 * @description Handles the validation logic checks
 * @param {string} condition - the condition to meet
 * @param {object} dataFieldValue - The data passed from the client
 * @param {string} condition_value - the condition value specified
 * @returns {boolean} - boolean representing success or failure
 */
  static validateLogicCheck(condition, dataFieldValue, condition_value) {
    let success = false;
    switch (condition) {
    case ('gte'):
      success = dataFieldValue >= condition_value;
      break;

    case ('gt'):
      success = dataFieldValue > condition_value;
      break;

    case ('eq'):
      success = dataFieldValue === condition_value;
      break;

    case ('neq'):
      success = dataFieldValue !== condition_value;
      break;

    case ('contains'):
      // only return for string and array
      success = (valueIsArray(dataFieldValue) || valueIsString(dataFieldValue))
      && (condition_value.includes(dataFieldValue));
      break;
    default:
      success = false;
    }
    return success;
  }

  /**
 * @description Handles the generation of the data to show users
 * @param {object} data - The data information
 * @param {string} field - the field variable information
 * @returns {boolean} - generated data to display to user
 */
  static generateFieldData(data, field) {
    let fieldDataDetails = {
      message: null, fieldData: null
    };
    let message;

    if (valueIsArray(data) || valueIsString(data)) {
      fieldDataDetails = ValidationService.validatesDataIsStringOrArray(data, field);
    } else if (valueIsObject(data)) {
      const allLevel = field.split('.');
      // check if more than two nested
      if (allLevel.length > 3) {
        message = `${field} should not be more than two levels`;
        throw new ExceptionError(message);
      }
      const generatedData = generateDataFieldValue(allLevel, data, field);
      if (generatedData.message) {
        throw new ExceptionError(generatedData.message);
      }
      fieldDataDetails = generatedData;
    }
    return fieldDataDetails;
  }

  /**
 * @description Handles the check when data is array or string
 * @param {object} data - The data information
 * @param {string} field - the field variable information
 * @returns {boolean} - generated data to display to user
 */
  static validatesDataIsStringOrArray(data, field) {
    const fieldDataDetails = {
      message: null, fieldData: null
    };
    if (!valueIsInt(field)) {
      const errorMessage = 'field shoulb be a valid number string.';
      throw new ExceptionError(errorMessage);
    }

    if (!data[valueToInt(field)]) {
      const errorMessage = `field ${field} is missing from data.`;
      throw new ExceptionError(errorMessage);
    }

    fieldDataDetails.fieldData = data[Number(field)];
    return fieldDataDetails;
  }

  /**
 * @description Handles the validation rule service
 * @param {object} rule - The rule information
 * @param {string} data - the data information
 * @returns {boolean} - generated data to display to user
 */
  static validateRuleService(rule, data) {
    const { condition_value, field, condition } = rule;

    const dataFieldValue = ValidationService.generateFieldData(data, field).fieldData;
    const success = ValidationService.validateLogicCheck(
      condition, dataFieldValue, condition_value
    );

    const validationData = generateValidationData(!success,
      field, dataFieldValue, condition, condition_value);
    if (!success) {
      const message = `field ${field} failed validation.`;
      throw new ExceptionError(message, validationData);
    }
    return validationData;
  }
}

export default ValidationService;
