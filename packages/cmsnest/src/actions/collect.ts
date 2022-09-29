import type { CollectionItemElement } from '@finsweet/ts-utils';

import type { CMSCore } from '$packages/cmscore';
import { normalizePropKey } from '$packages/cmscore';

import { ATTRIBUTES, getSelector } from '../utils/constants';
import type { NestSources, NestTargets } from '../utils/types';

// Constants
const {
  collection: { key: collectionKey },
  empty: { key: emptyKey },
} = ATTRIBUTES;

/**
 * Queries the existing CMS Collections on the page that will be nested inside the main list instance.
 * @returns A `Map` with the `collectionKey` as the keys and `CMSList` instances as the values.
 */
export const getNestSources = ({ createCMSListInstances }: CMSCore): NestSources => {
  const nestSources: NestSources = new Map();

  const listInstances = createCMSListInstances([getSelector('collection')]);

  for (const listInstance of listInstances) {
    const collectionId = normalizePropKey(listInstance.getAttribute(collectionKey));
    if (!collectionId) continue;

    const emptyElement = document.querySelector<HTMLElement>(`[${emptyKey}^="${collectionId}"]`);
    if (emptyElement) emptyElement.style.display = 'none';
    listInstance.wrapper.style.display = 'none';

    nestSources.set(collectionId, { listInstance, emptyElement });
  }

  return nestSources;
};

/**
 * Queries the target elements where the nested CMS Collections will be appended.
 * @param itemElement The `CollectionItemElement`.
 * @returns A `Map` with the `collectionKey` as the keys and `HTMLElement` targets as the values.
 */
export const getNestTargets = (itemElement: CollectionItemElement) => {
  const nestTargets: NestTargets = new Map();
  const nestTargetElements = itemElement.querySelectorAll<HTMLElement>(`${getSelector('collection')}:not(a)`);

  for (const target of nestTargetElements) {
    const collectionId = normalizePropKey(target.getAttribute(collectionKey));
    if (!collectionId) continue;

    nestTargets.set(collectionId, target);
  }

  return nestTargets;
};
