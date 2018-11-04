const { expect } = require('chai');
const { validateValue } = require('../index');

describe('validateValue', () => {
  it('Should throw an error if a given rule is not supported', () => {
    const rule = 'idonotexists';
    const rules = [rule];
    const name = 'foo';

    expect(() => validateValue({ value: undefined, rules, name })).to.throw(
      `Rule ${rule} is not supported`
    );
  });

  describe('Pre-defined validations', () => {
    describe('required', () => {
      const rules = ['required'];
      const name = 'foo';
      it('Should return an error if value is undefined', () => {
        const error = validateValue({ value: undefined, rules, name });
        expect(error).to.have.lengthOf(1);
      });

      it('Should return an error if value is an empty string', () => {
        const error = validateValue({ value: '', rules, name });
        expect(error).to.have.lengthOf(1);
      });

      it('Should not return an error if value is truthy', () => {
        const error = validateValue({ value: 'bar', rules, name });
        expect(error).to.have.lengthOf(0);
      });
    });

    describe('creditCard', () => {
      const rules = ['creditCard'];
      const name = 'foo';
      it('Should not return an error if value is an empty string', () => {
        const error = validateValue({ value: '', rules, name });
        expect(error).to.have.lengthOf(0);
      });

      it('Should return an error if value is an invalid card', () => {
        const error = validateValue({ value: '9999554048674408', rules, name });
        expect(error).to.have.lengthOf(1);
      });

      it('Should not return an error if value is a valid card', () => {
        const error = validateValue({ value: '4929554048674408', rules, name });
        expect(error).to.have.lengthOf(0);
      });
    });

    describe('max', () => {
      const rules = ['max:10'];
      const name = 'foo';
      it('Should not return an error if value is an empty string', () => {
        const error = validateValue({ value: '', rules, name });
        expect(error).to.have.lengthOf(0);
      });
      it('Should return an error if value length is higher than max', () => {
        const error = validateValue({ value: '12345678901', rules, name });
        expect(error).to.have.lengthOf(1);
      });

      it('Should return an error if value length is equal than max', () => {
        const error = validateValue({ value: '1234567890', rules, name });
        expect(error).to.have.lengthOf(1);
      });

      it('Should not an error if value length is less than max', () => {
        const error = validateValue({ value: '123456789', rules, name });
        expect(error).to.have.lengthOf(0);
      });
    });

    describe('min', () => {
      const rules = ['min:3'];
      const name = 'foo';

      it('Should not return an error if value is an empty string', () => {
        const error = validateValue({ value: '', rules, name });
        expect(error).to.have.lengthOf(0);
      });

      it('Should return an error if value length is less than min', () => {
        const error = validateValue({ value: '12', rules, name });
        expect(error).to.have.lengthOf(1);
      });

      it('Should return an error if value length is equal to min', () => {
        const error = validateValue({ value: '123', rules, name });
        expect(error).to.have.lengthOf(1);
      });

      it('Should not return an error if value length is higher than min', () => {
        const error = validateValue({ value: '1234', rules, name });
        expect(error).to.have.lengthOf(0);
      });
    });

    describe('alpha', () => {
      const rules = ['alpha'];
      const name = 'foo';

      it('Should not return an error if value is an empty string', () => {
        const error = validateValue({ value: '', rules, name });
        expect(error).to.have.lengthOf(0);
      });

      it('Should not return an error if value only contains letters', () => {
        const error = validateValue({ value: 'foo', rules, name });
        expect(error).to.have.lengthOf(0);
      });

      it('Should return an error if value only contains numbers', () => {
        const error = validateValue({ value: 'foo123', rules, name });
        expect(error).to.have.lengthOf(1);
      });
    });
  });

  describe('Custom error messages', () => {
    const rules = ['required'];
    const name = 'foo';
    const messages = {
      required: 'The field is required'
    };
    it('Should return an error with a custom error message', () => {
      const error = validateValue({ value: undefined, rules, name, messages });
      expect(error).to.have.lengthOf(1);
      expect(error[0]).to.be.eq(messages['required']);
    });
  });

  describe('Custom validation rules', () => {
    const myCustomRule = value => value === 'bar';
    const rules = [myCustomRule];
    const name = 'foo';
    it('Should not return an error if custom validation rule returns true', () => {
      const error = validateValue({ value: 'bar', rules, name });
      expect(error).to.have.lengthOf(0);
    });
    it('Should return an error if custom validation rule return false', () => {
      const error = validateValue({ value: 'baz', rules, name });
      expect(error).to.have.lengthOf(1);
    });
  });
});
