import type { ValueTypeError } from '@src/types/Error.types';

import { stringValidator, commaSeparatedStringValidator } from './StringValidator';

describe('String  Validator', () => {
  /**
   * String
   */
  test('Value exists', () => {
    const validator = stringValidator('value');
    expect(validator).toBe(true);
  });

  test('Value not exists', () => {
    try {
      stringValidator('');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid string');
    }
  });
});

describe('Comma separated String  Validator', () => {
  /**
   * Comma separated string
   */
  test('Value must be a valid comma separated string', () => {
    const validator = commaSeparatedStringValidator('testa,testb,testb');
    expect(validator).toBe(true);
  });

  test('Value is an invalid comma separated string', () => {
    try {
      commaSeparatedStringValidator('testa,20,testc,testd');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid comma separated string');
    }
  });
});
