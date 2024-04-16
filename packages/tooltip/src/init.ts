import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { cleanupTooltips, initRctTooltips, initTooltips } from './actions';
import { queryAllElements, type TooltipInstance } from './utils';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  const tooltipInstances: TooltipInstance[] = [] as TooltipInstance[];

  const targets = queryAllElements('target');
  const rctElements = document.querySelectorAll<HTMLDivElement>('[fs-richtext-element="rich-text"]');

  if (rctElements.length > 0) {
    const rctInstances = initRctTooltips(Array.from(rctElements));

    tooltipInstances.push(...rctInstances);
  }

  tooltipInstances.push(...initTooltips(targets));

  await waitWebflowReady();

  return {
    result: tooltipInstances,
    destroy() {
      cleanupTooltips(tooltipInstances);
    },
  };
};
