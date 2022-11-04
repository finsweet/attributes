import { isNotEmpty } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, NUMBER_COUNT_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { initNumberCount } from './factory';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const numberElements = queryElement('number', { operator: 'prefixed', all: true });

  const cleanups = numberElements.map(initNumberCount).filter(isNotEmpty);

  return finalizeAttribute(NUMBER_COUNT_ATTRIBUTE, numberElements, () => {
    for (const cleanup of cleanups) cleanup();
  });
};
