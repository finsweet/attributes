import { CMS_ATTRIBUTE_ATTRIBUTE, READ_TIME_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { initReadTime } from './factory';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const timeElements = queryElement('time', { operator: 'prefixed', all: true });

  for (const timeElement of timeElements) {
    initReadTime(timeElement);
  }

  return finalizeAttribute(READ_TIME_ATTRIBUTE);
};
