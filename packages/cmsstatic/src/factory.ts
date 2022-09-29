import { checkCMSCoreVersion, CMSList } from 'packages/cmscore/src';

import { ATTRIBUTES, queryElement } from './utils/constants';

/**
 * Inits static elements for a CMSList.
 * @param listInstance
 */
export async function initStaticInstance(listInstance: CMSList) {
  const instanceIndex = listInstance.getInstanceIndex(ATTRIBUTES.element.key);

  const staticElements = [...queryElement<HTMLDivElement>('staticItem', { all: true, instanceIndex })];

  const staticElementsData = staticElements.reduce<Parameters<CMSList['addStaticItems']>['0']>((acc, itemElement) => {
    const order = itemElement.getAttribute(ATTRIBUTES.order.key);

    const interactive = itemElement.getAttribute(ATTRIBUTES.interactive.key) === ATTRIBUTES.interactive.values.true;

    const staticIndex = order === null ? 0 : parseInt(order);
    const targetIndex = isNaN(staticIndex) || staticIndex <= 0 ? 0 : staticIndex - 1;

    acc.push({
      itemElement,
      interactive,
      targetIndex,
    });

    return acc;
  }, []);

  // TODO: Remove this once cmscore@1.8.0 has rolled out
  if (checkCMSCoreVersion('>=', '1.8.0')) {
    await listInstance.addStaticItems(staticElementsData);
  }
}
