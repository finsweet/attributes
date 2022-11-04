import { isString } from '@finsweet/ts-utils';

import type { AttributeOperator, AttributesDefinition, AttributeStaticValue, AttributeValue } from './types';

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
export const generateSelectors = <Attributes extends AttributesDefinition>(attributes: Attributes) => {
  type AttributesElementsValues = Attributes['element']['values'];
  type AttributesElementsKeys = keyof AttributesElementsValues;
  type AttributesSettingsKeys = keyof Omit<Attributes, 'element'>;
  type AttributeStaticParams = {
    operator?: AttributeOperator;
    caseInsensitive?: boolean;
  };
  type AttributeDynamicParams = AttributeStaticParams & {
    instanceIndex?: number;
    caseInsensitive?: boolean;
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

    if (isString(value)) attributeValue = value;
    else attributeValue = value(params && 'instanceIndex' in params ? params.instanceIndex : undefined);

    const caseInsensitive = params && 'caseInsensitive' in params && params.caseInsensitive ? 'i' : '';

    if (!params?.operator) return `[${attributeKey}="${attributeValue}"${caseInsensitive}]`;

    switch (params.operator) {
      case 'prefixed':
        return `[${attributeKey}^="${attributeValue}"${caseInsensitive}]`;
      case 'suffixed':
        return `[${attributeKey}$="${attributeValue}"${caseInsensitive}]`;
      case 'contains':
        return `[${attributeKey}*="${attributeValue}"${caseInsensitive}]`;
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
  function queryElement<
    E extends Element = Element,
    ElementKey extends AttributesElementsKeys = AttributesElementsKeys
  >(
    elementKey: ElementKey,
    params?: {
      scope?: ParentNode;
      all?: false;
    } & (AttributesElementsValues[ElementKey] extends AttributeStaticValue
      ? AttributeStaticParams
      : AttributeDynamicParams)
  ): E | null;
  function queryElement<
    E extends Element = Element,
    ElementKey extends AttributesElementsKeys = AttributesElementsKeys
  >(
    elementKey: ElementKey,
    params?: {
      scope?: ParentNode;
      all: true;
    } & (AttributesElementsValues[ElementKey] extends AttributeStaticValue
      ? AttributeStaticParams
      : AttributeDynamicParams)
  ): E[];
  function queryElement<
    E extends Element = Element,
    ElementKey extends AttributesElementsKeys = AttributesElementsKeys
  >(
    elementKey: ElementKey,
    params?: {
      scope?: ParentNode;
      all?: boolean;
    } & (AttributesElementsValues[ElementKey] extends AttributeStaticValue
      ? AttributeStaticParams
      : AttributeDynamicParams)
  ): E[] | E | null {
    const selector = getSelector('element', elementKey, params);
    const scope = params?.scope || document;

    return params?.all ? [...scope.querySelectorAll<E>(selector)] : scope.querySelector<E>(selector);
  }

  const getAttribute = <SettingKey extends AttributesSettingsKeys = AttributesSettingsKeys>(
    element: Element,
    settingKey: SettingKey
  ) => {
    const attribute = attributes[settingKey];
    if (!attribute) return null;

    return element.getAttribute(attribute.key);
  };

  return [getSelector, queryElement, getAttribute] as const;
};
