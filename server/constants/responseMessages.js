const RESPONSE_MESSAGES = {
  HOME_SUCCESS: 'My Rule-Validation API',
  SOMETHING_WENT_WRONT: 'Something went wrong, please try again.',
  NOT_FOUND: 'route does not exist.',
  RULE_REQUIRED: 'rule is required.',
  DATA_REQUIRED: 'data is required.',
  CONDITION_REQUIRED: 'rule.condition is required.',
  CONDITION_STRING: 'rule.condition should be a string.',
  CONDITION_CONTAIN: 'condition must be one of gte, gt, eq, neq and contain',
  RULE_NOT_OBJECT: 'rule should be a JSON object.',
  RULE_NOT_VALID_TYPE: 'data should be a JSON object, array or string.',
  INVALID_JSON: 'Invalid JSON payload passed.',
  DATA_TYPES: 'data must be one of string, object and array.',
  COND_VALUE_REQUIRED: 'condition_value is required.',
  FIELD_REQUIRED: 'field is required.',
  FIELD_IS_STRING: 'field should be a string.',
};

export default RESPONSE_MESSAGES;
