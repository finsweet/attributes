import { isNotEmpty } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, MODAL_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importAnimations } from '$global/import';
import { importA11Y } from '$global/import/a11y';

import { initModal } from './factory';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const modalElements = queryElement<HTMLElement>('modal', { operator: 'prefixed', all: true });

  const animationsModule = await importAnimations();
  if (!animationsModule) {
    return finalizeAttribute(MODAL_ATTRIBUTE, modalElements);
  }

  const cleanups = modalElements.map((modalElement) => initModal(modalElement, animationsModule)).filter(isNotEmpty);

  importA11Y();

  return finalizeAttribute(MODAL_ATTRIBUTE, modalElements, () => {
    for (const cleanup of cleanups) cleanup();
  });
};
