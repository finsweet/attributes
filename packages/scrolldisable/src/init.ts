import { CMS_ATTRIBUTE_ATTRIBUTE, SCROLL_DISABLE_ATTRIBUTE } from '$global/constants/attributes';

import { initClickTriggers } from './click';
import { ATTRIBUTES, getSelector } from './constants';
import { initDisplayTriggers } from './display';
import { setReserveScrollBarGap } from './scroll';

// Constants destructuring
const {
  gap: { key: gapKey, values: gapValues },
} = ATTRIBUTES;

/**
 * Inits the scrolldisable functionalities.
 */
export const init = async () => {
  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;

  const preserveScrollTargets = document.querySelectorAll(getSelector('element', 'preserve'));

  let reserveScrollbarGap = true;

  const reserveGapElement = document.querySelector(getSelector('gap'));
  const disableReserveGap = reserveGapElement?.getAttribute(gapKey) === gapValues.false;
  if (disableReserveGap) reserveScrollbarGap = false;

  setReserveScrollBarGap(reserveScrollbarGap);

  initClickTriggers(preserveScrollTargets);
  initDisplayTriggers(preserveScrollTargets);

  window.fsAttributes[SCROLL_DISABLE_ATTRIBUTE].resolve?.(undefined);
};
