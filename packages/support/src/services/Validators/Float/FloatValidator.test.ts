import type { ValueTypeError } from '@src/types/Error.types';

import { floatValidator, commaSeparatedFloatValidator } from './FloatValidator';

describe('Validate Float ', () => {
  /**
   * Float
   */

  test('Value must be a float - with dots', () => {
    const validator = floatValidator('1.1');
    expect(validator).toBe(true);
  });

  test('Value must be a float - with comma throw error', () => {
    try {
      floatValidator('1,1');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid float');
    }
  });

  test('Value is not a float - case 1', () => {
    try {
      floatValidator('abc');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid float');
    }
  });

  test('Value is not a float - case 2', () => {
    try {
      floatValidator('3BA3');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid float');
    }
  });

  test('Value is not a float - Conflict with comma', () => {
    try {
      floatValidator('1,2,3,4');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid float');
    }
  });
});

describe('Validate Comma Separated Float  Validator', () => {
  /**
   * Comma separated float
   */
  test('Value must be a valid comma separated float', () => {
    const validator = commaSeparatedFloatValidator('1.1,2.2');
    expect(validator).toBe(true);
  });

  test('Value is an invalid comma separated float', () => {
    try {
      commaSeparatedFloatValidator('1.1,2.2,3BA3');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid comma separated float');
    }
  });
});
