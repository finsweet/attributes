import type { ValueTypeError } from '@src/types/Error.types';

import { booleanValidator } from './BooleanValidator';

describe('Validator boolean ', () => {
  /**
   * Boolean
   */
  test('Value must be boolean true', () => {
    const validator = booleanValidator('true');
    expect(validator).toBe(true);
  });

  test('Value must be boolean false', () => {
    const validator = booleanValidator('false');
    expect(validator).toBe(true);
  });

  test('Value is not a boolean', () => {
    try {
      booleanValidator('abc');
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid boolean');
    }
  });
});
