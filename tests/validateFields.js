const { expect } = require('chai');
const { validateFields } = require('../index');

describe('validateFields', () => {
  const values = {
    firstName: '',
    lastName: '',
    email: ''
  };
  const validationRules = {
    firstName: 'required',
    lastName: 'required',
    email: 'email'
  };
  
  it('Should return an error for each invalid field', () => {
    const errors = validateFields({
      values,
      validationRules
    });
    expect(Object.keys(errors)).to.have.lengthOf(2);
  });

  it('Should return errors with custom messages', () => {
    const messages = {
      firstName: {
        required: 'First name is a required field'
      }
    };
    const errors = validateFields({
      values,
      validationRules,
      messages
    });
    expect(errors.firstName[0]).to.be.eq(messages.firstName.required);
    expect(Object.keys(errors)).to.have.lengthOf(2);
  });
});
