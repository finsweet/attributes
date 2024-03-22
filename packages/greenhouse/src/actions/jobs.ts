import { getCMSElementSelector } from '@finsweet/attributes-utils';

import type { JobWithContent } from '../types';
import { SUPPORTED_NESTED_KEYS } from '../utils/constants';
import { addJobsToCMSItems, addNestedJobsToCMSItems } from '../utils/lists';
import { getAttribute, queryAllElements } from '../utils/selectors';

export async function createCMSList(listWrapper: HTMLElement, queryParam: string, jobs: JobWithContent[]) {
  // Create the list instances
  // @ts-expect-error TODO: Support fs-list
  const listInstance = createCMSListInstance(listWrapper);

  if (!listInstance) {
    return;
  }

  await addJobsCMSList(listInstance, queryParam, jobs);
}

// @ts-expect-error TODO: Support fs-list
export async function addJobsCMSList(listInstance: CMSList, queryParam: string, jobs: JobWithContent[]) {
  const groupByKey = getNestedKey(listInstance);

  if (groupByKey) {
    addNestedJobsToCMSItems(listInstance, jobs, queryParam, groupByKey);
    return;
  }

  addJobsToCMSItems(listInstance, jobs, queryParam);
}

// @ts-expect-error TODO: Support fs-list
export function getNestedKey(listInstance: CMSList): string | null {
  const templateItem = [...listInstance.items][0];

  const { element } = templateItem;

  const nestedList = element.querySelector<HTMLDivElement>(getCMSElementSelector('wrapper'));

  if (!nestedList) {
    return null;
  }

  const groupBy = queryAllElements(undefined, { scope: element }).find((groupElement) => {
    const elementAttribute = getAttribute(groupElement, 'element');

    if (!elementAttribute) {
      return false;
    }

    return (groupElement.contains(element) === false && SUPPORTED_NESTED_KEYS.includes(elementAttribute)) || false;
  });

  return (groupBy && getAttribute(groupBy, 'element')) || null;
}
