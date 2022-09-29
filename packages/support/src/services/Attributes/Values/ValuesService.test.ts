import type { AttributeValue } from '$global/types/schema';
import { assertElementExistsOnPage } from '@src/services/DOM/Assertions/AssertionsService';
//mocks
import { queryAttributeValue } from '@src/services/DOM/Queries/QueriesService';
import SchemaSelector from '@src/services/Selector/SchemaSelector';
import ValueTypeValidatorError from '@src/services/Validators/Errors/ValueTypeValidatorError';
import { floatValidator, commaSeparatedFloatValidator } from '@src/services/Validators/Float/FloatValidator';
import type { ItemError } from '@src/types/Error.types';

import AttributeValueNotMatchExpectedError from './Errors/AttributeValueNotMatchExpectedError';
import AttributeValueNotMatchTypeError from './Errors/AttributeValueNotMatchTypeError';
import checkElementSettingValue from './ValuesService';

jest.mock('@src/services/DOM/Queries/QueriesService', () => {
  return {
    queryAttributeValue: jest.fn(),
  };
});
jest.mock('@src/services/DOM/Assertions/AssertionsService', () => {
  return {
    assertElementExistsOnPage: jest.fn(),
  };
});
jest.mock('@src/services/Validators/Float/FloatValidator', () => {
  return {
    floatValidator: jest.fn(),
    commaSeparatedFloatValidator: jest.fn(),
  };
});

const mockQueryAttributeValue = queryAttributeValue as jest.Mock;
const mockAssertElementExistsOnPage = assertElementExistsOnPage as jest.Mock;
const mockFloatValidator = floatValidator as jest.Mock;
const mockCommaSeparatedFloatValidator = commaSeparatedFloatValidator as jest.Mock;

describe('Validate attribute values - float', () => {
  beforeEach(() => {
    mockQueryAttributeValue.mockClear();
    mockAssertElementExistsOnPage.mockClear();
    mockFloatValidator.mockClear();
  });

  test('Validate float type successful', () => {
    const elementSelector = new SchemaSelector('fs-cmsload-threshold', '-200');

    const appliedSelector = [new SchemaSelector('fs-cmsload-element', 'list-1')];

    const schemaValues: AttributeValue = {
      type: 'float',
      default: '-20',
    };

    mockAssertElementExistsOnPage.mockReturnValue(true);
    mockQueryAttributeValue.mockReturnValue('-200');
    mockFloatValidator.mockReturnValue(true);

    const response = checkElementSettingValue(elementSelector, schemaValues, '-200', appliedSelector);
    expect(response).toBe(true);

    expect(mockAssertElementExistsOnPage).toHaveBeenCalledTimes(1);
    expect(mockAssertElementExistsOnPage).toHaveBeenCalledWith('[fs-cmsload-element="list-1"][fs-cmsload-threshold]');

    expect(mockQueryAttributeValue).toHaveBeenCalledTimes(1);
    expect(mockQueryAttributeValue).toHaveBeenCalledWith(
      '[fs-cmsload-element="list-1"][fs-cmsload-threshold]',
      'fs-cmsload-threshold'
    );

    expect(mockFloatValidator).toHaveBeenCalledTimes(1);
    expect(mockFloatValidator).toHaveBeenCalledWith('-200');
  });

  test('Validate float type throw Not Match Value Type', () => {
    try {
      const elementSelector = new SchemaSelector('fs-cmsload-threshold', '-200');

      const appliedSelector = [new SchemaSelector('fs-cmsload-element', 'list-2')];

      const schemaValues: AttributeValue = {
        type: 'float',
        default: '-20',
      };

      mockAssertElementExistsOnPage.mockReturnValue(true);
      mockQueryAttributeValue.mockReturnValue('abcd');
      mockFloatValidator.mockImplementation(() => {
        throw new ValueTypeValidatorError('', 'float');
      });

      checkElementSettingValue(elementSelector, schemaValues, '-200', appliedSelector);

      expect(false).toBe(true);
    } catch (e) {
      const errorType = e as ItemError;
      expect(errorType).toBeInstanceOf(AttributeValueNotMatchTypeError);

      expect(mockAssertElementExistsOnPage).toHaveBeenCalledTimes(1);
      expect(mockAssertElementExistsOnPage).toHaveBeenCalledWith('[fs-cmsload-element="list-2"][fs-cmsload-threshold]');

      expect(mockQueryAttributeValue).toHaveBeenCalledTimes(1);
      expect(mockQueryAttributeValue).toHaveBeenCalledWith(
        '[fs-cmsload-element="list-2"][fs-cmsload-threshold]',
        'fs-cmsload-threshold'
      );

      expect(mockFloatValidator).toHaveBeenCalledTimes(1);
      expect(mockFloatValidator).toHaveBeenCalledWith('abcd');
    }
  });

  test('Validate float type throw Not Match Value', () => {
    try {
      const elementSelector = new SchemaSelector('fs-cmsload-threshold', '-200');

      const appliedSelector = new SchemaSelector('fs-cmsload-element', 'list-1');

      const schemaValues: AttributeValue = {
        type: 'float',
        default: '-20',
      };

      mockAssertElementExistsOnPage.mockReturnValue(true);
      mockQueryAttributeValue.mockReturnValue('-20');
      mockFloatValidator.mockReturnValue(true);

      checkElementSettingValue(elementSelector, schemaValues, '-200', [appliedSelector]);

      expect(false).toBe(true);
    } catch (e) {
      const errorType = e as ItemError;
      expect(errorType).toBeInstanceOf(AttributeValueNotMatchExpectedError);
      expect(mockAssertElementExistsOnPage).toHaveBeenCalledTimes(1);
      expect(mockAssertElementExistsOnPage).toHaveBeenCalledWith('[fs-cmsload-element="list-1"][fs-cmsload-threshold]');

      expect(mockQueryAttributeValue).toHaveBeenCalledTimes(1);
      expect(mockQueryAttributeValue).toHaveBeenCalledWith(
        '[fs-cmsload-element="list-1"][fs-cmsload-threshold]',
        'fs-cmsload-threshold'
      );

      expect(mockFloatValidator).toHaveBeenCalledTimes(1);
      expect(mockFloatValidator).toHaveBeenCalledWith('-20');
    }
  });
});

describe('Validate attribute values - comma separated floats', () => {
  beforeEach(() => {
    mockQueryAttributeValue.mockClear();
    mockAssertElementExistsOnPage.mockClear();
    mockCommaSeparatedFloatValidator.mockClear();
  });

  const schemaValues: AttributeValue = {
    type: 'commaSeparatedFloat',
    default: '1',
  };

  test('Validate comma separated float type successful', () => {
    const elementSelector = new SchemaSelector('fs-cmsload-custom', '1,2,3');

    const appliedSelector = [new SchemaSelector('fs-cmsload-element', 'list-4')];

    mockAssertElementExistsOnPage.mockReturnValue(true);
    mockQueryAttributeValue.mockReturnValue('1,2,3');
    mockCommaSeparatedFloatValidator.mockReturnValue(true);

    const response = checkElementSettingValue(elementSelector, schemaValues, '1,2,3', appliedSelector);

    expect(response).toBe(true);
    expect(mockAssertElementExistsOnPage).toHaveBeenCalledTimes(1);
    expect(mockAssertElementExistsOnPage).toHaveBeenCalledWith('[fs-cmsload-element="list-4"][fs-cmsload-custom]');

    expect(mockQueryAttributeValue).toHaveBeenCalledTimes(1);
    expect(mockQueryAttributeValue).toHaveBeenCalledWith(
      '[fs-cmsload-element="list-4"][fs-cmsload-custom]',
      'fs-cmsload-custom'
    );

    expect(mockCommaSeparatedFloatValidator).toHaveBeenCalledTimes(1);
    expect(mockCommaSeparatedFloatValidator).toHaveBeenCalledWith('1,2,3');
  });

  test('Validate comma separated float type throw Not Match Value Type', () => {
    try {
      const elementSelector = new SchemaSelector('fs-cmsload-custom', '1,2,3');

      const appliedSelector = [new SchemaSelector('fs-cmsload-element', 'list-1')];

      mockAssertElementExistsOnPage.mockReturnValue(true);
      mockQueryAttributeValue.mockReturnValue('1,2,abc');
      mockCommaSeparatedFloatValidator.mockImplementation(() => {
        throw new ValueTypeValidatorError('', 'comma separated float');
      });

      checkElementSettingValue(elementSelector, schemaValues, '1,2,3', appliedSelector);

      expect(false).toBe(true);
    } catch (e) {
      const errorType = e as ItemError;
      expect(errorType).toBeInstanceOf(AttributeValueNotMatchTypeError);
      expect(mockAssertElementExistsOnPage).toHaveBeenCalledTimes(1);
      expect(mockAssertElementExistsOnPage).toHaveBeenCalledWith('[fs-cmsload-element="list-1"][fs-cmsload-custom]');

      expect(mockQueryAttributeValue).toHaveBeenCalledTimes(1);
      expect(mockQueryAttributeValue).toHaveBeenCalledWith(
        '[fs-cmsload-element="list-1"][fs-cmsload-custom]',
        'fs-cmsload-custom'
      );

      expect(mockCommaSeparatedFloatValidator).toHaveBeenCalledTimes(1);
      expect(mockCommaSeparatedFloatValidator).toHaveBeenCalledWith('1,2,abc');
    }
  });

  test('Validate comma separated float type throw Not Match Expected Value', () => {
    try {
      const elementSelector = new SchemaSelector('fs-cmsload-custom', '1,2,3');

      const appliedSelector = [new SchemaSelector('fs-cmsload-element', 'list-1')];

      mockAssertElementExistsOnPage.mockReturnValue(true);
      mockQueryAttributeValue.mockReturnValue('1,2,3,4');
      mockCommaSeparatedFloatValidator.mockReturnValue(true);

      checkElementSettingValue(elementSelector, schemaValues, '1,2,3', appliedSelector);

      expect(false).toBe(true);
    } catch (e) {
      const errorType = e as ItemError;
      expect(errorType).toBeInstanceOf(AttributeValueNotMatchExpectedError);
      expect(mockAssertElementExistsOnPage).toHaveBeenCalledTimes(1);
      expect(mockAssertElementExistsOnPage).toHaveBeenCalledWith('[fs-cmsload-element="list-1"][fs-cmsload-custom]');

      expect(mockQueryAttributeValue).toHaveBeenCalledTimes(1);
      expect(mockQueryAttributeValue).toHaveBeenCalledWith(
        '[fs-cmsload-element="list-1"][fs-cmsload-custom]',
        'fs-cmsload-custom'
      );

      expect(mockCommaSeparatedFloatValidator).toHaveBeenCalledTimes(1);
      expect(mockCommaSeparatedFloatValidator).toHaveBeenCalledWith('1,2,3,4');
    }
  });
});
