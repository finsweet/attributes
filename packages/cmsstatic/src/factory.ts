import type { CMSList } from '@finsweet/attributes-cmscore';
import { parseNumericAttribute } from '@finsweet/attributes-utils';

import { getAttribute, getInstanceIndex, hasAttributeValue, queryAllElements } from './utils/selectors';

/**
 * Inits static elements for a CMSList.
 * @param listInstance
 */
export async function initStaticInstance(listInstance: CMSList) {
  const instanceIndex = getInstanceIndex(listInstance.listOrWrapper);

  const staticElements = queryAllElements<HTMLDivElement>('static-item', { instanceIndex });

  const staticElementsData = staticElements.reduce<Parameters<CMSList['addStaticItems']>['0']>((acc, itemElement) => {
    const order = getAttribute(itemElement, 'order');

    const interactive = hasAttributeValue(itemElement, 'interactive', 'true');

    const rawRepeat = getAttribute(itemElement, 'repeat');
    const repeat = parseNumericAttribute(rawRepeat);

    const staticIndex = parseNumericAttribute(order, 0);
    const targetIndex = isNaN(staticIndex) || staticIndex <= 0 ? 0 : staticIndex - 1;

    acc.push({
      itemElement,
      interactive,
      targetIndex,
      repeat,
    });

    return acc;
  }, []);

  await listInstance.addStaticItems(staticElementsData);
}
