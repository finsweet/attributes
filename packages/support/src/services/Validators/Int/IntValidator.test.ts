import type { ValueTypeError } from '@src/types/Error.types';

import { intValidator, commaSeparatedIntValidator } from './IntValidator';

describe('Validate Int ', () => {
  /**
   * Int
   */
  test('Value must be a int', () => {
    const validator = intValidator('1');
    expect(validator).toBe(true);
  });

  test('Value must be a int - large number', () => {
    const validator = intValidator('1434');
    expect(validator).toBe(true);
  });

  test('Value is not a int - case 1', () => {
    try {
      intValidator('abc');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid int');
    }
  });

  test('Value is not a int - case 2', () => {
    try {
      intValidator('3BA3');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid int');
    }
  });

  test('Value is not a int - case 3', () => {
    try {
      intValidator('2.5');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid int');
    }
  });
});

describe('Validate comma separate int validator', () => {
  /**
   * Comma separated int
   */
  test('Value must be a valid comma separated int', () => {
    const validator = commaSeparatedIntValidator('1,2,3,4');
    expect(validator).toBe(true);
  });

  test('Value is an invalid comma separated int', () => {
    try {
      commaSeparatedIntValidator('1,2,2.3,4');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid comma separated int');
    }
  });
});
