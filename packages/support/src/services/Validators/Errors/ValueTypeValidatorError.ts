import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';

export default class ValueTypeValidatorError extends AbstractSchemaError {
  type = 'setting-type-of-value-not-match';
  typeInputError: string;

  constructor(message: string, typeInput: string) {
    super();

    this.message = message;
    this.typeInputError = typeInput;

    Object.setPrototypeOf(this, ValueTypeValidatorError.prototype);
  }
}
