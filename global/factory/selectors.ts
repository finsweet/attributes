import type { AttributeOperator, AttributeStaticValue, AttributeValue } from './types';

/**
 * Creates a dynamic attribute value.
 * @param value The static attribute value.
 * @returns A callback for generating new attribute values by index.
 */
export const generateDynamicAttibuteValue = (value: string) => {
  return (index?: number): string => `${value}${index ? `-${index}` : ''}`;
};

/**
 * @returns A `getSelector` callback for the passed `attributes` object.
 * @param attributes An object containing all attribute keys and values.
 */
export const generateSelectors = <
  Attributes extends {
    [name: string]: {
      key: string;
      values?: {
        [valueKey: string]: AttributeValue;
      };
    };
  }
>(
  attributes: Attributes
) => {
  type AttributesValues = Attributes['element']['values'];
  type AttributesValuesKeys = keyof AttributesValues;
  type AttributeStaticParams = {
    operator?: AttributeOperator;
  };
  type AttributeDynamicParams = AttributeStaticParams & {
    instanceIndex?: number;
  };

  /**
   * Generates a query selector based on the preferences.
   * @param name The name of the attribute.
   * @param valueKey The value of the attribute.
   * @param params.index Only accepted when the value is dynamic.
   * @param params.operator Optional operator for the selector.
   * @returns The query selector based on the preferences.
   */
  const getSelector = <Name extends keyof Attributes, ValueKey extends keyof Attributes[Name]['values']>(
    name: Name,
    valueKey?: ValueKey,
    params?: Attributes[Name]['values'][ValueKey] extends AttributeStaticValue
      ? AttributeStaticParams
      : AttributeDynamicParams
  ): string => {
    const attribute = attributes[name];

    const { key: attributeKey, values } = attribute;
    let attributeValue: string;

    if (!valueKey) return `[${attributeKey}]`;

    const value = values?.[valueKey] as AttributeValue;

    if (typeof value === 'string') attributeValue = value;
    else attributeValue = value(params && 'instanceIndex' in params ? params.instanceIndex : undefined);

    if (!params?.operator) return `[${attributeKey}="${attributeValue}"]`;

    switch (params.operator) {
      case 'prefixed':
        return `[${attributeKey}^="${attributeValue}"]`;
      case 'suffixed':
        return `[${attributeKey}$="${attributeValue}"]`;
      case 'contains':
        return `[${attributeKey}*="${attributeValue}"]`;
    }
  };

  /**
   * Queries an element using the generated element selectors.
   * @param elementKey The element key.
   * @param params.instanceIndex Only accepted when the value is dynamic.
   * @param params.operator Optional operator for the selector.
   * @param params.scope The scope for the query. Defaults to `document`.
   * @param params.all determines if array of matched elements should be returned.
   */
  function queryElement<E extends Element = Element, ElementKey extends AttributesValuesKeys = AttributesValuesKeys>(
    elementKey: ElementKey,
    params?: {
      scope?: ParentNode;
      all?: false;
    } & (AttributesValues[ElementKey] extends AttributeStaticValue ? AttributeStaticParams : AttributeDynamicParams)
  ): E | null;
  function queryElement<E extends Element = Element, ElementKey extends AttributesValuesKeys = AttributesValuesKeys>(
    elementKey: ElementKey,
    params?: {
      scope?: ParentNode;
      all: true;
    } & (AttributesValues[ElementKey] extends AttributeStaticValue ? AttributeStaticParams : AttributeDynamicParams)
  ): NodeListOf<E>;
  function queryElement<E extends Element = Element, ElementKey extends AttributesValuesKeys = AttributesValuesKeys>(
    elementKey: ElementKey,
    params?: {
      scope?: ParentNode;
      all?: boolean;
    } & (AttributesValues[ElementKey] extends AttributeStaticValue ? AttributeStaticParams : AttributeDynamicParams)
  ): NodeListOf<E> | E | null {
    const selector = getSelector('element', elementKey, params);
    const scope = params?.scope || document;

    return params?.all ? scope.querySelectorAll<E>(selector) : scope.querySelector<E>(selector);
  }

  return [getSelector, queryElement] as const;
};
