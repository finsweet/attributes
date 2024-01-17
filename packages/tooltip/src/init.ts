import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { cleanupTooltips, initRctTooltips, initTooltips } from './actions';
import { type GlobalSettings, queryAllElements, SETTINGS, type TooltipInstance } from './utils';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit<typeof SETTINGS> = async (globalSettings = {}) => {
  const tooltipInstances: TooltipInstance[] = [] as TooltipInstance[];

  const targets = queryAllElements('target');
  const rctElements = document.querySelectorAll<HTMLDivElement>('[fs-richtext-element="rich-text"]');

  if (rctElements.length > 0) {
    const rctInstances = initRctTooltips(Array.from(rctElements), globalSettings as GlobalSettings);

    tooltipInstances.push(...rctInstances);
  }

  tooltipInstances.push(...initTooltips(targets, globalSettings as GlobalSettings));

  await waitWebflowReady();

  return {
    result: tooltipInstances,
    destroy() {
      cleanupTooltips(tooltipInstances);
    },
  };
};
