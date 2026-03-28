const Validator = require('validatorjs');

const validate = (body, rules, customMessages = {}) => {
  return new Validator(body, rules, customMessages);
};

module.exports = validate;