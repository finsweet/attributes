import { isNotEmpty, restartWebflow } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, RICH_TEXT_ATTRIBUTE, TOC_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { scrollToAnchor } from './actions/scroll';
import { initTOCInstance } from './factory';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<void> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE, RICH_TEXT_ATTRIBUTE);

  const contentsElements = queryElement<HTMLElement>('contents', { operator: 'prefixed', all: true });

  const cleanups = contentsElements.map(initTOCInstance).filter(isNotEmpty);

  // URL hash Anchor
  scrollToAnchor();

  if (cleanups.length) {
    await restartWebflow();
  }

  // TODO: Finish API
  return finalizeAttribute(TOC_ATTRIBUTE, undefined, () => {
    for (const cleanup of cleanups) cleanup();
  });
};
