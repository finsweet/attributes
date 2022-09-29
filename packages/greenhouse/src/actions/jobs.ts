import { CMS_CSS_CLASSES } from '@finsweet/ts-utils';
import type { JobWithContent } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';

import { CMSList, importCMSCore } from '$packages/cmscore';

import { ATTRIBUTES, SUPPORTED_NESTED_KEYS } from '../utils/constants';
import { addJobsToCMSItems, addNestedJobsToCMSItems } from '../utils/lists';

export async function createCMSList(listWrapper: HTMLElement, queryParam: string, jobs: JobWithContent[]) {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  // Create the list instances
  const listInstance = cmsCore.createCMSListInstance(listWrapper);

  if (!listInstance) {
    return;
  }

  await addJobsCMSList(listInstance, queryParam, jobs);
}

export async function addJobsCMSList(listInstance: CMSList, queryParam: string, jobs: JobWithContent[]) {
  const groupByKey = getNestedKey(listInstance);

  if (groupByKey) {
    addNestedJobsToCMSItems(listInstance, jobs, queryParam, groupByKey);
    return;
  }

  addJobsToCMSItems(listInstance, jobs, queryParam);
}

export function getNestedKey(listInstance: CMSList): string | null {
  const templateItem = [...listInstance.items][0];

  const { element } = templateItem;

  const nestedList = element.querySelector<HTMLDivElement>(`.${CMS_CSS_CLASSES.wrapper}`);

  if (!nestedList) {
    return null;
  }

  const groupBy = [...element.querySelectorAll<HTMLElement>(`[${ATTRIBUTES.element.key}]`)].find((groupElement) => {
    const elementAttribute = groupElement.getAttribute(ATTRIBUTES.element.key);

    if (!elementAttribute) {
      return false;
    }

    return (groupElement.contains(element) === false && SUPPORTED_NESTED_KEYS.includes(elementAttribute)) || false;
  });

  return (groupBy && groupBy.getAttribute(ATTRIBUTES.element.key)) || null;
}
