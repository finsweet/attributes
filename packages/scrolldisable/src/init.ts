import { CMS_ATTRIBUTE_ATTRIBUTE, SCROLL_DISABLE_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { initClickTriggers } from './click';
import { ATTRIBUTES, getSelector } from './constants';
import { initDisplayTriggers } from './display';
import { setReserveScrollBarGap } from './scroll';

/**
 * Inits the scrolldisable functionalities.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const preserveScrollTargets = document.querySelectorAll(getSelector('element', 'preserve'));

  let reserveScrollbarGap = true;

  const reserveGapElement = document.querySelector(getSelector('gap'));
  const disableReserveGap = reserveGapElement?.getAttribute(ATTRIBUTES.gap.key) === ATTRIBUTES.gap.values.false;
  if (disableReserveGap) reserveScrollbarGap = false;

  setReserveScrollBarGap(reserveScrollbarGap);

  const destroyClickListeners = initClickTriggers(preserveScrollTargets);
  const destroyDisplayListeners = initDisplayTriggers(preserveScrollTargets);

  return finalizeAttribute(SCROLL_DISABLE_ATTRIBUTE, undefined, () => {
    destroyClickListeners();
    destroyDisplayListeners();
  });
};
