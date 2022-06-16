import type { DOMSelector, ElementSelector, ParentSelector, SelectorSelector } from '@global/types/schema';
import type { ItemError } from '@src/types/Error.types';

export default class AbstractSchemaError extends Error implements ItemError {
  public type: string;
  public message: string;

  constructor() {
    super('');
    this.type = '';
    this.message = '';
    Object.setPrototypeOf(this, AbstractSchemaError.prototype);
  }

  stripHTML() {
    return this.message.replace(/<[^>]*>?/gm, '');
  }

  selectorsToLabels(selectors: DOMSelector[], joinWord = 'or') {
    const displaySelectors = selectors.filter((selector: DOMSelector) => selector.label !== 'Collection List Wrapper');
    const selectorsLabels = this.wrapSelectors(displaySelectors);
    const labelsText = this.listToSentence(selectorsLabels, joinWord);
    return labelsText;
  }

  parentToLabels(parentSelector: ParentSelector) {
    const parentList = parentSelector.map((parentItem: ElementSelector | SelectorSelector) => {
      if (parentItem.type === 'element') {
        return this.toLabel(parentItem.element);
      }

      if (parentItem.type === 'selector') {
        return this.toLabel(parentItem.selector.label);
      }

      throw new Error('Error in parent structure, nor element or selector.');
    });

    return this.parentToSentence(parentList);
  }

  wrapSelectors(selectors: (DOMSelector | string)[]) {
    if (selectors.length <= 0) {
      throw new Error('Unexpected error: missing selectors in error wrap selectors');
    }

    return selectors.map((selector: DOMSelector | string) => {
      if ((selector as DOMSelector).label) {
        const label =
          ((selector as DOMSelector).label === 'Any element' && 'any element on the page') ||
          (selector as DOMSelector).label;

        return this.toLabel(label);
      }

      const stringSelector = selector as string;
      return this.toLabel(stringSelector);
    });
  }

  toLabel(value: string) {
    //return `<span class="validator-label">${value}</span>`
    return value;
  }

  toHighlight(value: string) {
    // return `<span class="validator-highlight">${value}</span>`
    return value;
  }

  toAttribute(value: string) {
    // return `<span class="validator-attribute">${value}</span>`
    return value;
  }

  listToSentence(values: string[], joinWord = 'or') {
    return (values.length > 1 && values.slice(0, -1).join(', ') + ` ${joinWord} ` + values.slice(-1)) || values[0];
  }

  parentToSentence(values: string[] | null) {
    if (values === null) {
      throw new Error("Parent can't be null");
    }
    return values.join('>');
  }
}
