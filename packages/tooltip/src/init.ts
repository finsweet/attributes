import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { setupTooltip } from './actions';
import { queryAllElements, queryElement, SETTINGS, type TooltipInstance } from './utils';

const initTooltips = (targets: HTMLElement[], globalSettings: any): TooltipInstance[] => {
  const instances: TooltipInstance[] = [];

  targets.forEach((target) => {
    const tooltip = queryElement('tooltip', { scope: target });
    const arrowElement = queryElement('arrow', { scope: target });

    if (!tooltip || !arrowElement || !target) return;

    instances.push(setupTooltip(target, tooltip, arrowElement, globalSettings));
  });

  return instances;
};

const cleanupTooltips = (instances: TooltipInstance[]) => {
  instances.forEach((instance) => instance.cleanup());
};

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit<typeof SETTINGS> = async (globalSettings = {}) => {
  console.log('Tooltip attribute initialized', globalSettings);
  const targets = queryAllElements('target');

  const tooltipInstances = initTooltips(targets, globalSettings);

  await waitWebflowReady();
  return {
    result: tooltipInstances,
    destroy() {
      cleanupTooltips(tooltipInstances);
    },
  };
};
