# Values Validator

# Usage

## `validateValue()`

```js
const fieldErrors = validateValue({
  value: '',
  rules: ['required|email|max:250'],
  name: 'email',
  // Optional
  messages: {
    required: 'Email is required',
    email: 'Email is not valid',
    max: 'Email is too large'
  }
});
```

## `validateFields()`

```js
const formErrors = validateFields({
  values: {
    firstName: 'John',
    email: 'john@example.com'
  },
  validationRules: {
    firstName: 'required|max:250',
    email: 'required|email|max:250'
  }
  // Optional
  messages: {
    firstName: {
      required: 'First Name is a required field',
      max: 'First Name is too large'
    },
    email: {
      required: 'Email is required',
      email: 'Email is invalid',
      max: 'Email is too large'
    }
  }
});
```

# Pre-defined rules

| Rule         |               Definition               |
| ------------ | :------------------------------------: |
| `required`   |   Checks if value has a truthy value   |
| `max`        |        Max limit of characters         |
| `min`        |         Min limit of characted         |
| `alpha`      |    Checks if value has only letters    |
| `creditCard` | Checks if value is a valid credit card |

# Custom rules

You can also pass a function as a rule. If the function returns `false`, then we add an error to the field.

```js
const myCustomRule = value => value === 'bar';
const rules = [myCustomRule];

const fieldErrors = validateValue({ value: 'bar', rules, name: 'myField' });
```

In this case errors will be an empty array, because `myCustomRule` is returning `true`.

# @TODO:

- Add more pre-defined rules
- Allow to add custom message for custom rules
