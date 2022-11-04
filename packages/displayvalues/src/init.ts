import { isFormField } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, DISPLAY_VALUES_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { collectTargets } from './actions/collect';
import { listenEvents } from './actions/events';
import { syncValue } from './actions/sync';
import { queryElement } from './utils/constants';

/**
 * Inits click events mirroring.
 */
export const init = async (): Promise<Element[]> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const sourceElements = queryElement('source', { operator: 'prefixed', all: true });

  for (const sourceElement of sourceElements) {
    if (!isFormField(sourceElement)) continue;

    collectTargets(sourceElement);
    syncValue(sourceElement);
  }

  const removeListeners = listenEvents();

  return finalizeAttribute(DISPLAY_VALUES_ATTRIBUTE, sourceElements, () => {
    removeListeners();
  });
};
