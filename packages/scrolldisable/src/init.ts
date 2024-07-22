import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initClickTriggers } from './click';
import { initDisplayTriggers } from './display';
import { setReserveScrollBarGap } from './scroll';
import { getSettingSelector, hasAttributeValue, queryAllElements } from './utils/selectors';

/**
 * Inits the scrolldisable functionalities.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const preserveScrollTargets = queryAllElements('preserve');

  let reserveScrollbarGap = true;

  const reserveGapElement = document.querySelector(getSettingSelector('gap'));

  const disableReserveGap = reserveGapElement && hasAttributeValue(reserveGapElement, 'gap', 'false');
  if (disableReserveGap) {
    reserveScrollbarGap = false;
  }

  setReserveScrollBarGap(reserveScrollbarGap);

  const destroyClickListeners = initClickTriggers(preserveScrollTargets);
  const destroyDisplayListeners = initDisplayTriggers(preserveScrollTargets);

  return {
    destroy() {
      destroyClickListeners();
      destroyDisplayListeners();
    },
  };
};
