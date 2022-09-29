import type { AttributeSettingValueOptions, AttributeValue } from '$global/types/schema';
import { assertElementExistsOnPage } from '@src/services/DOM/Assertions/AssertionsService';
import { queryAttributeValue } from '@src/services/DOM/Queries/QueriesService';
import { booleanValidator } from '@src/services/Validators/Boolean/BooleanValidator';
import { floatValidator, commaSeparatedFloatValidator } from '@src/services/Validators/Float/FloatValidator';
import { intValidator, commaSeparatedIntValidator } from '@src/services/Validators/Int/IntValidator';
// validators
import { optionsValidator } from '@src/services/Validators/Options/OptionsValidator';
import { stringValidator, commaSeparatedStringValidator } from '@src/services/Validators/String/StringValidator';
import type { ValueTypeError } from '@src/types/Error.types';
import type { SchemaSelector } from '@src/types/Schema.types';

import AttributeValueNotFoundError from './Errors/AttributeValueNotFoundError';
import AttributeValueNotMatchExpectedError from './Errors/AttributeValueNotMatchExpectedError';
// erros
import AttributeValueNotMatchTypeError from './Errors/AttributeValueNotMatchTypeError';

export function checkSettingValue(
  element: HTMLElement,
  settingSelector: SchemaSelector,
  schemaValue: AttributeValue | AttributeValue[],
  attributeValue: string
) {
  const attributeValueInDOM = element && element.getAttribute(settingSelector.getAttribute());

  if (!element || !attributeValueInDOM) {
    throw new Error('Unexpected error: Element not found for check value.');
  }

  validateSettingType(attributeValueInDOM, schemaValue, settingSelector);

  validateSettingValue(attributeValue, attributeValueInDOM, settingSelector);
}

export function checkFieldSettingValue(
  elements: HTMLElement[],
  attribute: string,
  schemaValue: AttributeValue | AttributeValue[],
  attributeValue: string,
  settingSelector: SchemaSelector
) {
  const element =
    (elements.length <= 1 && elements[0]) ||
    elements.find((element: HTMLElement) => {
      return element.hasAttribute(attribute) && element.getAttribute(attribute)?.toString() === attributeValue;
    });

  const attributeValueInDOM = element && element.getAttribute(attribute);

  if (!element || !attributeValueInDOM) {
    throw new Error('Unexpected error: Element not found for check value.');
  }

  validateSettingType(attributeValueInDOM, schemaValue, settingSelector);

  validateSettingValue(attributeValue, attributeValueInDOM, settingSelector);

  return true;
}

/**
 * Assert value is equal to expected value and the type is equal to expected type;
 *
 * @param settingSelector
 * @param schemaValue
 * @param attributeValue
 * @param appliedToSelectors
 * @returns
 */
export default function checkElementSettingValue(
  settingSelector: SchemaSelector,
  schemaValue: AttributeValue | AttributeValue[],
  attributeValue: string,
  appliedToSelectors: SchemaSelector[]
) {
  // Find the attribute value in AppliedTo Elements
  const elementAppliedTo: SchemaSelector | undefined = appliedToSelectors.find((appended) => {
    try {
      const apppliedSelector = appended
        .getElementSelector()
        .split(',')
        .map((attributeSelector: string) => {
          return `${attributeSelector}${settingSelector.getAttributeSelector()}`;
        })
        .join(',');

      return assertElementExistsOnPage(apppliedSelector);
    } catch {
      return false;
    }
  });

  // If none is found, throw an error
  if (!elementAppliedTo && appliedToSelectors && appliedToSelectors.length > 0) {
    throw new Error('Unexpected error: Element not found for check value.');
  }

  const attributeElementSelector =
    `${(elementAppliedTo && elementAppliedTo.getElementSelector()) || ''}` + settingSelector.getAttributeSelector();

  let attributeValueInDOM: string;

  try {
    attributeValueInDOM = queryAttributeValue(attributeElementSelector, settingSelector.attribute);
  } catch {
    throw new AttributeValueNotFoundError(settingSelector, appliedToSelectors[0]);
  }

  validateSettingType(attributeValueInDOM, schemaValue, settingSelector);

  validateSettingValue(attributeValue, attributeValueInDOM, settingSelector);

  return true;
}

function validateValueType(type: string, attributeValue: string, options?: { value: string; description: string }[]) {
  switch (type) {
    case 'options': {
      if (!options || !options.length) {
        throw new Error('Options are not defined');
      }
      const optionsValues = options.map((option) => option.value);
      return optionsValidator(attributeValue, optionsValues);
    }
    case 'boolean':
      return booleanValidator(attributeValue);
    case 'string':
      return stringValidator(attributeValue);
    case 'commaSeparatedString':
      return commaSeparatedStringValidator(attributeValue);
    case 'int':
      return intValidator(attributeValue);
    case 'commaSeparatedInt':
      return commaSeparatedIntValidator(attributeValue);
    case 'float':
      return floatValidator(attributeValue);
    case 'commaSeparatedFloat':
      return commaSeparatedFloatValidator(attributeValue);
    default:
      throw new Error(`Type validator ${type} not found`);
  }
}

function validateSettingType(
  attributeValueInDOM: string,
  schemaValue: AttributeValue | AttributeValue[],
  settingSelector: SchemaSelector
): void {
  if (Array.isArray(schemaValue)) {
    const isValid = schemaValue.some((value) => {
      const { type, options } = value as AttributeSettingValueOptions;
      try {
        validateValueType(type, attributeValueInDOM, options);
        return true;
      } catch (e: unknown) {
        return false;
      }
    });

    if (!isValid) {
      throw new AttributeValueNotMatchTypeError(settingSelector, schemaValue.map((value) => value.type).join(', '));
    }
  } else {
    const { type, options } = schemaValue as AttributeSettingValueOptions;
    try {
      validateValueType(type, attributeValueInDOM, options);
    } catch (e: unknown) {
      const error = e as ValueTypeError;
      throw new AttributeValueNotMatchTypeError(settingSelector, error.typeInputError);
    }
  }
}

function validateSettingValue(attributeValue: string, attributeValueInDOM: string, settingSelector: SchemaSelector) {
  if (attributeValue.toString() !== attributeValueInDOM) {
    throw new AttributeValueNotMatchExpectedError(settingSelector, attributeValueInDOM, attributeValue.toString());
  }
}
