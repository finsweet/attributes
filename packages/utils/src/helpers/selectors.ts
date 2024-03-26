import type { AttributeElements, AttributeSettings, FsAttributeKey } from '../types';

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
   * @param params.instance The index of the element instance.
   */
  const getElementSelector = (elementKey?: ElementsDefinition[number], { instance }: { instance?: string } = {}) => {
    if (!elementKey) {
      return `[${ELEMENT_ATTRIBUTE_NAME}]`;
    }

    const elementSelector = `[${ELEMENT_ATTRIBUTE_NAME}="${elementKey}" i]`;
    if (!instance) {
      return elementSelector;
    }

    const instanceSelector = `[${INSTANCE_ATTRIBUTE_NAME}="${instance}"]`;

    return `${elementSelector}${instanceSelector}, ${instanceSelector} ${elementSelector}`;
  };

  /**
   * @returns The first element that matches the selector.
   * @param elementKey The key of the element.
   * @param params.instance The index of the element instance.
   * @param params.scope The scope to query the element from. Defaults to `document`.
   */
  const queryElement = <E extends Element = HTMLElement>(
    elementKey?: ElementsDefinition[number],
    { instance, scope = document }: { instance?: string; scope?: ParentNode } = {}
  ) => {
    const selector = getElementSelector(elementKey, { instance });

    return scope.querySelector<E>(selector);
  };

  /**
   * @returns All elements that match the selector.
   * @param elementKey The key of the element.
   * @param params.instance The index of the element instance.
   * @param params.scope The scope to query the element from. Defaults to `document`.
   */
  const queryAllElements = <E extends Element = HTMLElement>(
    elementKey?: ElementsDefinition[number],
    { instance, scope = document }: { instance?: string; scope?: ParentNode } = {}
  ) => {
    const selector = getElementSelector(elementKey, { instance });

    return [...scope.querySelectorAll<E>(selector)];
  };

  /**
   * @returns The instance index of an element.
   * @param element The element to get the instance index from.
   */
  const getInstance = (element: Element) => {
    const instanceHolder = element.closest(`[${INSTANCE_ATTRIBUTE_NAME}]`);
    if (!instanceHolder) return;

    const instance = instanceHolder.getAttribute(INSTANCE_ATTRIBUTE_NAME);
    if (!instance) return;

    return instance;
  };

  /**
   * @returns The first ancestor that matches the selector.
   * @param elementKey The key of the element.
   * @param params.instance The index of the element instance.
   */
  const getClosestElement = <E extends Element = HTMLElement>(
    element: Element,
    elementKey?: ElementsDefinition[number],
    { instance }: { instance?: string } = {}
  ) => {
    const selector = getElementSelector(elementKey, { instance });

    return element.closest<E>(selector);
  };

  /**
   * @returns The value of an attribute. It will check, in order:
   * - The element itself.
   * - The closest ancestor that has the attribute.
   * - The script tags.
   *
   * @param element The element to get the attribute value from, or its closest ancestor that has the attribute. If `null`, it will check the script tags.
   * @param settingKey The attribute key.
   * @param filterInvalid Whether to filter out invalid values. Defaults to `false`.
   */
  const getAttribute = <
    SettingKey extends keyof SettingsDefinition,
    FilterInvalid extends boolean = false,
    SettingValues = SettingsDefinition[SettingKey]['values'],
    SettingValue = SettingValues extends Record<string, string>
      ? FilterInvalid extends true
        ? SettingValues[keyof SettingValues]
        : string
      : string
  >(
    element: Element | null,
    settingKey: SettingKey,
    filterInvalid?: FilterInvalid
  ) => {
    const attributeName = getSettingAttributeName(settingKey);
    const selector = getSettingSelector(settingKey);

    const settingElement = element?.closest(selector);

    // Check the element
    let rawValue = settingElement?.getAttribute(attributeName);

    // Check the script tags
    if (!rawValue) {
      for (const script of window.fsAttributes.scripts) {
        rawValue = script.getAttribute(attributeName);

        if (rawValue) break;
      }
    }

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
    getClosestElement,
    getElementSelector,
    getSettingSelector,
    getSettingAttributeName,
    queryElement,
    queryAllElements,
    getInstance,
    getAttribute,
    hasAttributeValue,
  };
};
