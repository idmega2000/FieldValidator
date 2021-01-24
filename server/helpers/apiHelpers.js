import generalHelper from 'helpers/generalHelper';

/**
     * @description api helper
     */
const apiHelper = {

  /**
     * @description generate data
     * @param {string} status - the status of the validation
     * @param {string} nameOfField - name of field
     * @param {*} field - field value
     * @param {*} condition - data passed by the user
     * @param {*} conditionValue - data passed by the user
     * @returns {object} - object representing generated data
     */
  generateValidationData: (
    status,
    nameOfField,
    field,
    condition,
    conditionValue
  ) => {
    const data = {
      validation: {
        error: status,
        field: nameOfField,
        field_value: field,
        condition,
        condition_value: conditionValue
      }
    };
    return data;
  },

  /**
     * @description get the nested data and checks
     * @param {string} allLevel - array of the split of all data oject level
     * @param {object} data - data passed by the user
     * @returns {object} - object representing field data
     */
  generateDataFieldValue: (
    allLevel,
    data
  ) => {
    const { valueIsObject } = generalHelper;
    let trackFieldData = data;
    let message = null;
    let trackFieldName = 'data';

    // the idea is to move nested as the loop is happening
    // while also validating the nested data
    // loop through the array of all levels
    allLevel.some((item, index) => {
      trackFieldData = trackFieldData[item] || false;
      trackFieldName = `${trackFieldName}.${item}`;

      // check if first is an object if nested data
      if (index === 0
        && allLevel.length !== 0
         && !valueIsObject(trackFieldData)) {
        message = `${trackFieldName} should be an object.`;
        // break the loop and display error msg
        return true;
      }
      // check if the data exist and return if it does not
      if (!trackFieldData) {
        message = `${trackFieldName} is required.`;
        // break the loop and display error msg
        return true;
      }
    });
    return { message, fieldData: trackFieldData };
  }

};

export default apiHelper;
