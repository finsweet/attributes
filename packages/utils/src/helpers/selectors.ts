import type { AttributeElements, AttributeSettings, FsAttributeKey } from '../types';
import { isNumber } from './guards';

/**
 * @returns Selector helpers for the defined Attribute Elements and Settings.
 * @param attributeKey
 * @param elements
 * @param settings
 */
export const generateSelectors = <
  ElementsDefinition extends AttributeElements,
  SettingsDefinition extends AttributeSettings
>(
  attributeKey: FsAttributeKey,
  elements: ElementsDefinition,
  settings: SettingsDefinition
) => {
  const ELEMENT_ATTRIBUTE_NAME = `fs-${attributeKey}-element`;
  const INSTANCE_ATTRIBUTE_NAME = `fs-${attributeKey}-instance`;

  /**
   * Constructs the attribute name for a setting.
   * @param settingKey
   */
  const getSettingAttributeName = (settingKey: keyof SettingsDefinition) => {
    const { key } = settings[settingKey];

    return `fs-${attributeKey}-${key}`;
  };

  /**
   * @returns A valid CSS selector for a setting.
   * @param settingKey The key of the setting.
   * @param valueKey [Optional] The key of the setting value.
   * @param explicitValue [Optional] An explicit value to use instead of a predefined setting value.
   */
  const getSettingSelector = <SettingKey extends keyof SettingsDefinition>(
    settingKey: SettingKey,
    valueKey?: keyof SettingsDefinition[SettingKey]['values'],
    explicitValue?: string
  ) => {
    const { values = {} } = settings[settingKey];

    const attributeName = getSettingAttributeName(settingKey);

    // Predefined setting value
    if (valueKey) {
      const value = values[valueKey as keyof typeof values];

      return `[${attributeName}="${value}" i]`;
    }

    // Explicit setting value
    if (explicitValue) {
      return `[${attributeName}="${explicitValue}" i]`;
    }

    // No setting value
    return `[${attributeName}]`;
  };

  /**
   * @returns A valid CSS selector for an element.
   * @param elementKey The key of the element.
   * @param params.instanceIndex The index of the element instance.
   */
  const getElementSelector = (
    elementKey?: ElementsDefinition[number],
    { instanceIndex }: { instanceIndex?: number } = {}
  ) => {
    if (!elementKey) {
      return `[${ELEMENT_ATTRIBUTE_NAME}]`;
    }

    const elementSelector = `[${ELEMENT_ATTRIBUTE_NAME}="${elementKey}" i]`;

    if (!isNumber(instanceIndex)) {
      return elementSelector;
    }

    const instanceSelector = `[${INSTANCE_ATTRIBUTE_NAME}="${instanceIndex}"]`;

    return `${elementSelector}${instanceSelector}, ${instanceSelector} ${elementSelector}`;
  };

  /**
   * @returns The first element that matches the selector.
   * @param elementKey The key of the element.
   * @param params.instanceIndex The index of the element instance.
   * @param params.scope The scope to query the element from. Defaults to `document`.
   */
  const queryElement = <E extends Element = HTMLElement>(
    elementKey?: ElementsDefinition[number],
    { instanceIndex, scope = document }: { instanceIndex?: number; scope?: ParentNode } = {}
  ) => {
    const selector = getElementSelector(elementKey, { instanceIndex });

    return scope.querySelector<E>(selector);
  };

  /**
   * @returns All elements that match the selector.
   * @param elementKey The key of the element.
   * @param params.instanceIndex The index of the element instance.
   * @param params.scope The scope to query the element from. Defaults to `document`.
   */
  const queryAllElements = <E extends Element = HTMLElement>(
    elementKey?: ElementsDefinition[number],
    { instanceIndex, scope = document }: { instanceIndex?: number; scope?: ParentNode } = {}
  ) => {
    const selector = getElementSelector(elementKey, { instanceIndex });

    return [...scope.querySelectorAll<E>(selector)];
  };

  /**
   * @returns The instance index of an element.
   * @param element The element to get the instance index from.
   */
  const getInstanceIndex = (element: Element) => {
    const instanceHolder = element.closest(`[${INSTANCE_ATTRIBUTE_NAME}]`);
    if (!instanceHolder) return;

    const rawInstanceIndex = instanceHolder.getAttribute(INSTANCE_ATTRIBUTE_NAME);
    if (!rawInstanceIndex) return;

    const instanceIndex = parseInt(rawInstanceIndex);
    if (isNaN(instanceIndex)) return;

    return instanceIndex;
  };

  /**
   * @returns The value of an attribute.
   * @param element The element to get the attribute value from, or its closest ancestor that has the attribute.
   * @param settingKey The attribute key.
   * @param filterInvalid Whether to filter out invalid values. Defaults to `false`.
   */
  const getAttribute = <
    SettingKey extends keyof SettingsDefinition,
    FilterInvalid extends boolean = false,
    SettingValues = SettingsDefinition[SettingKey]['values'],
    SettingValue = SettingValues extends Record<string, string>
      ? FilterInvalid extends true
        ? keyof SettingValues
        : string
      : string
  >(
    element: Element,
    settingKey: SettingKey,
    filterInvalid?: FilterInvalid
  ) => {
    const attributeName = getSettingAttributeName(settingKey);
    const selector = getSettingSelector(settingKey);

    const settingElement = element.closest(selector);

    const rawValue = settingElement?.getAttribute(attributeName) || undefined;
    if (!rawValue) return;

    if (filterInvalid) {
      const { values = {} } = settings[settingKey];

      if (!Object.values(values).includes(rawValue)) return;
    }

    const value = rawValue as SettingValue;
    return value;
  };

  /**
   * @returns Whether an element has a specific attribute value.
   * @param element
   * @param settingKey
   * @param valueKey
   */
  const hasAttributeValue = <SettingKey extends keyof SettingsDefinition>(
    element: Element,
    settingKey: SettingKey,
    valueKey: keyof SettingsDefinition[SettingKey]['values']
  ) => {
    const { values = {} } = settings[settingKey];

    const value = values[valueKey as keyof typeof values];

    return getAttribute(element, settingKey) === value;
  };

  return {
    getElementSelector,
    getSettingSelector,
    getSettingAttributeName,
    queryElement,
    queryAllElements,
    getInstanceIndex,
    getAttribute,
    hasAttributeValue,
  };
};
