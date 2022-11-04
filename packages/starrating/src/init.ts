import { CMS_ATTRIBUTE_ATTRIBUTE, STAR_RATING_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { listenEvents } from './actions/events';
import { initStarRatingGroup } from './factory';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const groups = queryElement('group', { operator: 'prefixed', all: true });
  groups.forEach(initStarRatingGroup);

  const cleanups = listenEvents();

  return finalizeAttribute(STAR_RATING_ATTRIBUTE, groups, () => {
    for (const cleanup of cleanups) cleanup();
  });
};
