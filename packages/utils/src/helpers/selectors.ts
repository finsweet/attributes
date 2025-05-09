import type { AttributeElements, AttributeSettings, FinsweetAttributeKey, LooseString } from '../types';

/**
 * @returns Selector helpers for the defined Attribute Elements and Settings.
 * @param attributeKey
 * @param elements
 * @param settings
 */
export const generateSelectors = <
  ElementsDefinition extends AttributeElements,
  SettingsDefinition extends AttributeSettings,
>(
  attributeKey: FinsweetAttributeKey,
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
    value?: LooseString<NonNullable<SettingsDefinition[SettingKey]['values']>[number]>
  ) => {
    const attributeName = getSettingAttributeName(settingKey);

    // With setting value
    if (value) {
      return `[${attributeName}="${value}" i]`;
    }

    // No setting value
    return `[${attributeName}]`;
  };

  /**
   * @returns A valid CSS selector for an element.
   * @param elementKey The key of the element.
   * @param params.instance The index of the element instance.
   * If `null`, it will select all elements without an instance.
   * If `undefined`, it will select all elements.
   */
  const getElementSelector = (
    elementKey?: ElementsDefinition[number],
    { instance }: { instance?: string | null } = {}
  ) => {
    if (!elementKey) {
      return `[${ELEMENT_ATTRIBUTE_NAME}]`;
    }

    const elementSelector = `[${ELEMENT_ATTRIBUTE_NAME}="${elementKey}" i]`;

    // If no instance is provided, select all elements
    if (instance === undefined) {
      return elementSelector;
    }

    // If instance is null, select all elements without an instance
    if (instance === null) {
      return `${elementSelector}:not([${INSTANCE_ATTRIBUTE_NAME}], [${INSTANCE_ATTRIBUTE_NAME}] ${elementSelector})`;
    }

    // If instance exists, select the specific element instance
    const instanceSelector = `[${INSTANCE_ATTRIBUTE_NAME}="${instance}"]`;

    return `${elementSelector}${instanceSelector}, ${instanceSelector} ${elementSelector}`;
  };

  /**
   * @returns A valid CSS selector for an element instance.
   * @param instance The instance identifier.
   */
  const getInstanceSelector = (instance: string) => {
    return `[${INSTANCE_ATTRIBUTE_NAME}="${instance}"]`;
  };

  /**
   * @returns The first element that matches the selector.
   * @param elementKey The key of the element.
   * @param params.instance The index of the element instance.
   * @param params.scope The scope to query the element from. Defaults to `document`.
   */
  const queryElement = <E extends Element = HTMLElement>(
    elementKey?: ElementsDefinition[number],
    { instance, scope }: { instance?: string | null; scope?: ParentNode | null } = {}
  ) => {
    const selector = getElementSelector(elementKey, { instance });
    const target = scope || document;

    return target.querySelector<E>(selector);
  };

  /**
   * @returns All elements that match the selector.
   * @param elementKey The key of the element.
   * @param params.instance The index of the element instance.
   * @param params.scope The scope to query the element from. Defaults to `document`.
   */
  const queryAllElements = <E extends Element = HTMLElement>(
    elementKey?: ElementsDefinition[number],
    { instance, scope }: { instance?: string | null; scope?: ParentNode | null } = {}
  ) => {
    const selector = getElementSelector(elementKey, { instance });
    const target = scope || document;

    return [...target.querySelectorAll<E>(selector)];
  };

  /**
   * @returns The instance index of an element.
   * @param element The element to get the instance index from.
   */
  const getInstance = (element: Element) => {
    const instanceHolder = element.closest(`[${INSTANCE_ATTRIBUTE_NAME}]`);
    if (!instanceHolder) return null;

    return instanceHolder.getAttribute(INSTANCE_ATTRIBUTE_NAME);
  };

  /**
   * @returns The first ancestor that matches the selector.
   * @param elementKey The key of the element.
   * @param params.instance The index of the element instance.
   */
  const getClosestElement = <E extends Element = HTMLElement>(
    element: Element,
    elementKey?: ElementsDefinition[number],
    { instance }: { instance?: string | null } = {}
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
    SettingDefaultValue = SettingsDefinition[SettingKey]['defaultValue'],
    SettingValueIsNumeric = SettingsDefinition[SettingKey]['isNumeric'],
    SettingValue = SettingValueIsNumeric extends true
      ? number
      : SettingValues extends Array<string>
        ? FilterInvalid extends true
          ? SettingValues[number]
          : string
        : string,
  >(
    element: Element | null,
    settingKey: SettingKey,
    { filterInvalid }: { filterInvalid?: FilterInvalid } = {}
  ): SettingDefaultValue extends string ? SettingValue : SettingValue | undefined => {
    const attributeName = getSettingAttributeName(settingKey);
    const selector = getSettingSelector(settingKey);

    const settingElement = element?.closest(selector);

    // Check the element
    let rawValue = settingElement?.getAttribute(attributeName);

    // Check the script tags
    if (!rawValue) {
      for (const script of window.FinsweetAttributes.scripts) {
        rawValue = script.getAttribute(attributeName);

        if (rawValue) break;
      }
    }

    // Fall back to the default value, if available
    const { values = [], defaultValue, isNumeric } = settings[settingKey];

    rawValue ??= defaultValue;

    // @ts-expect-error Returning undefined is valid
    if (!rawValue) return;

    // Parse numeric values
    if (isNumeric) {
      let parsedValue = Number(rawValue);

      if (isNaN(parsedValue) && defaultValue) {
        parsedValue = Number(defaultValue);
      }

      if (!isNaN(parsedValue)) {
        return parsedValue as SettingValue;
      }
    }

    // @ts-expect-error Returning undefined is valid
    if (filterInvalid && values.length && !values.includes(rawValue)) return;

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
    value: NonNullable<SettingsDefinition[SettingKey]['values']>[number]
  ) => {
    return getAttribute(element, settingKey) === value;
  };

  return {
    getClosestElement,
    getElementSelector,
    getSettingSelector,
    getInstanceSelector,
    getSettingAttributeName,
    queryElement,
    queryAllElements,
    getInstance,
    getAttribute,
    hasAttributeValue,
  };
};
