const validator = require('validator');

const validateValue = ({ value, rules = [], name, messages = {} }) => {
  return rules
    .map(rule => {
      // Check if it's a composed rule
      const [ruleName, constraint] =
        typeof rule === 'string' && rule.includes(':')
          ? rule.split(':')
          : [rule];

      return {
        rule: ruleName,
        constraint
      };
    })
    .filter(({ rule, constraint }) => {
      if (typeof rule === 'function') {
        return !rule(value);
      }
      switch (rule) {
        case 'required':
          return !Boolean(value);
        case 'creditCard':
          return value ? !validator.isCreditCard(value) : false;
        case 'email':
          return value ? !validator.isEmail(value) : false;
        case 'max':
          return value ? value.length >= constraint : false;
        case 'min':
          return value ? value.length <= constraint : false;
        case 'alpha':
          return value ? !validator.isAlpha(value) : false;
        default:
          throw new Error(`Rule ${rule} is not supported`);
      }
    })
    .map(({ rule }) => {
      return messages[rule] || `The ${name} is invalid`;
    });
};

const validateFields = ({ values, validationRules, messages = {} }) => {
  const errors = {};
  for (let name in validationRules) {
    const rules = validationRules[name].split('|');
    const value = values[name];
    const fieldErrors = validateValue({
      value,
      rules,
      name,
      messages: messages[name]
    });
    if (fieldErrors.length) {
      errors[name] = fieldErrors;
    }
  }
  return errors;
};

module.exports = {
  validateFields,
  validateValue
};
