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

export function valueServiceV2(
  elements: HTMLElement[],
  attribute: string,
  schemaValue: { type: string; options?: { value: string; description: string }[] },
  attributeValue: string,
  schemaSelector: SchemaSelector
) {
  const { type, options } = schemaValue;

  const element =
    (elements.length <= 1 && elements[0]) ||
    elements.find((element: HTMLElement) => {
      return element.hasAttribute(attribute) && element.getAttribute(attribute)?.toString() === attributeValue;
    });

  const attributeValueInDOM = element && element.getAttribute(attribute);

  if (!element || !attributeValueInDOM) {
    throw new Error('Unexpected error: Element not found for check value.');
  }

  try {
    validateValueType(type, attributeValueInDOM, options);
  } catch (e: unknown) {
    const error = e as ValueTypeError;
    throw new AttributeValueNotMatchTypeError(schemaSelector, error.typeInputError);
  }

  if (attributeValue.toString() !== attributeValueInDOM) {
    throw new AttributeValueNotMatchExpectedError(schemaSelector, attributeValueInDOM, attributeValue.toString());
  }

  return true;
}

/**
 * Assert value is equal to expected value and the type is equal to expected type;
 *
 * @param schemaSelector
 * @param schemaValue
 * @param attributeValue
 * @param appliedToSelectors
 * @returns
 */
export default function valueService(
  schemaSelector: SchemaSelector,
  schemaValue: { type: string; options?: { value: string; description: string }[] },
  attributeValue: string,
  appliedToSelectors: SchemaSelector[]
) {
  const { type, options } = schemaValue;

  // Find the attribute value in AppliedTo Elements
  const elementAppliedTo =
    appliedToSelectors &&
    appliedToSelectors.find((appended) => {
      try {
        const apppliedSelector = appended
          .getElementSelector()
          .split(',')
          .map((attributeSelector: string) => {
            return `${attributeSelector}${schemaSelector.getAttributeSelector()}`;
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
    `${(elementAppliedTo && elementAppliedTo.getElementSelector()) || ''}` + schemaSelector.getAttributeSelector();

  let attributeValueInDOM;

  try {
    attributeValueInDOM = queryAttributeValue(attributeElementSelector, schemaSelector.attribute);
  } catch {
    throw new AttributeValueNotFoundError(schemaSelector, appliedToSelectors[0]);
  }

  // validate html value type
  try {
    validateValueType(type, attributeValueInDOM, options);
  } catch (e: unknown) {
    const error = e as ValueTypeError;
    throw new AttributeValueNotMatchTypeError(schemaSelector, error.typeInputError);
  }

  // validate html value match input
  if (attributeValue.toString() !== attributeValueInDOM) {
    throw new AttributeValueNotMatchExpectedError(schemaSelector, attributeValueInDOM, attributeValue.toString());
  }
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
