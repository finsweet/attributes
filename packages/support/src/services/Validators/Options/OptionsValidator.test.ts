import type { ValueTypeError } from '@src/types/Error.types';

import { optionsValidator } from './OptionsValidator';

describe('Option  Validators', () => {
  /**
   * Option
   */
  test('Value must be a valid option', () => {
    const validator = optionsValidator('option1', ['option1', 'option2']);
    expect(validator).toBe(true);
  });

  test('Value is an invalid option', () => {
    try {
      optionsValidator('option3', ['option1', 'option2']);
      expect(true).toBe(false);
    } catch (e: unknown) {
      const typeError = e as ValueTypeError;
      expect(typeError.message).toBe('Value is not a valid option');
    }
  });
});
