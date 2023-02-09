import type { CollectionListWrapperElement } from '@finsweet/ts-utils';

import { getCMSElementSelector, getInstanceIndex } from '$global/helpers';
import type { CMSCore, CMSList } from '$packages/cmscore';

import { ATTRIBUTES, getSelector } from './constants';

/**
 * Populates a Select element's options based on the source values.
 * @param selectElement
 */
export const populateSelectElement = (selectElement: HTMLSelectElement, cmsCore: CMSCore) => {
  const instanceIndex = getInstanceIndex(selectElement, ATTRIBUTES.element.key);
  const displaySources = getDisplaySources(instanceIndex);

  const listInstances: Set<CMSList> = new Set();
  const optionsMemo: Set<string> = new Set();

  for (const displaySource of displaySources) {
    addSelectOption(selectElement, displaySource, optionsMemo);

    const collectionListWrapper = displaySource.closest<CollectionListWrapperElement>(getCMSElementSelector('wrapper'));
    if (!collectionListWrapper) continue;

    const listIntance = cmsCore.createCMSListInstance(collectionListWrapper);
    if (!listIntance) continue;

    listInstances.add(listIntance);
  }

  for (const listInstance of listInstances) {
    listInstance.on('additems', (addedItems) => {
      for (const { element } of addedItems) {
        const displaySources = getDisplaySources(instanceIndex, element);

        for (const displaySource of displaySources) addSelectOption(selectElement, displaySource, optionsMemo);
      }
    });
  }

  return [...listInstances];
};

/**
 * Queries the display source elements.
 * @param instanceIndex
 * @param scope
 */
const getDisplaySources = (instanceIndex: number | undefined, scope: Document | Element = document) => [
  ...scope.querySelectorAll<HTMLElement>(getSelector('element', 'textValue', { instanceIndex })),
];

/**
 * Adds a new <option> to the <select> element using a displaySource's text.
 * @param selectElement
 * @param displaySource
 * @param optionsMemo
 */
const addSelectOption = (selectElement: HTMLSelectElement, { innerText }: HTMLElement, optionsMemo: Set<string>) => {
  if (!innerText || optionsMemo.has(innerText)) return;

  const newOption = new Option(innerText, innerText);
  selectElement.options.add(newOption);
  optionsMemo.add(innerText);
};
