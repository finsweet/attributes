import type {
  SchemaSelector,
  /*, SCHEMA_ITEM_TYPES*/
} from '@src/types/Schema.types';

// import type { AttributeElementSchema, AttributeFieldSchema, AttributeSettingSchema } from '@global/types/schema';

class Selector implements SchemaSelector {
  attribute: string;
  value: string;
  initial: boolean;
  caseInsensitive: boolean;
  elements: HTMLElement[];

  constructor(attribute: string, value: string, initial = false, caseInsensitive = false) {
    this.attribute = attribute;
    this.value = value;
    this.initial = initial;
    this.caseInsensitive = caseInsensitive;
    this.elements = [];
  }

  getElementKey(): string {
    if (!this.attribute.endsWith('element')) {
      throw new Error('Unexpected error: trying to get element label from not element selector');
    }

    return this.value
      .split('-')
      .map((innerValue: string) => innerValue.replace(/[a-z]/g, (match) => match.toUpperCase()))
      .join(' ');
  }

  getCaseIncensitiveFlag() {
    return this.caseInsensitive ? 'i' : '';
  }

  setAttribute(attribute: string) {
    this.attribute = attribute;
  }

  setValue(value: string) {
    this.value = value;
  }

  setElement(element: HTMLElement) {
    this.elements = [element];
  }

  setElements(elements: HTMLElement[]) {
    this.elements = elements;
  }

  getAttribute() {
    return this.attribute;
  }

  getValue() {
    return this.value;
  }

  getItemLabel() {
    const splitAttribute = this.attribute.split('-');
    const keyAttribute = splitAttribute[splitAttribute.length - 1];
    return (keyAttribute === 'element' && 'Element') || 'Setting';
  }

  getElementSelector() {
    if (this.value === '') {
      return this.getAttributeSelector();
    }

    if (this.initial) {
      return `[${this.attribute}="${this.value}"${this.getCaseIncensitiveFlag()}],[${this.attribute}="${
        this.value
      }-1"${this.getCaseIncensitiveFlag()}]`;
    }

    return `[${this.attribute}="${this.value}"${this.getCaseIncensitiveFlag()}]`;
  }

  getSelectors(selectors: string[], separator = ' '): string {
    if (!this.value) {
      throw new Error('Missing required selector value to multiple selectors');
    }

    const elementSelectors = this.getElementSelector().split(',');

    return elementSelectors
      .map((elementSelector: string) => {
        return selectors.map((selector: string) => `${elementSelector}${separator}${selector}`);
      })
      .flat()
      .join(',');
  }

  getAttributeSelector() {
    return `[${this.attribute}]`;
  }

  getPrettierSelector() {
    return `${this.attribute}="${this.value}"`;
  }

  getInitial() {
    return this.initial;
  }
}

export default Selector;
