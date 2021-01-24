const generalHelper = {

  valueIsObject: (value) => (
    value !== null && typeof value === 'object' && Array.isArray(value) === false),

  valueIsArray: (value) => Array.isArray(value),

  valueIsString: (value) => (typeof value === 'string'),
  valueIsInt: (value) => !isNaN(value) && Number.isInteger(parseFloat(value)),
  valueToInt: (value) => parseInt(value),

};

export default generalHelper;
