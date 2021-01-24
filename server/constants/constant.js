export const CONDITION_TYPE = {
  gte: ['number'],
  gt: ['number'],
  eq: ['number', 'string'],
  neq: ['number', 'string'],
  contains: ['string']
};

export const REQUIRED_CONDITION = ['gte', 'gt', 'eq', 'neq', 'contains'];
