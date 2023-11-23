import { setupTooltip } from '../actions';
import { getAttribute, type GlobalSettings, queryElement, type TooltipInstance } from '../utils';

/**
 * Inits the tooltip attribute.
 * @param targets
 * @param globalSettings
 * @returns - An array of tooltip instances with cleanup functions.
 */
export const initTooltips = (targets: HTMLElement[], globalSettings: GlobalSettings): TooltipInstance[] => {
  const instances: TooltipInstance[] = [];

  targets.forEach((target) => {
    const tooltip = queryElement('tooltip', { scope: target });
    const arrowElement = queryElement('arrow', { scope: target });

    if (!tooltip || !arrowElement || !target) return;

    instances.push(setupTooltip(target, tooltip, globalSettings, arrowElement));
  });

  return instances;
};

/**
 * Cleans up all tooltip instances.
 * @param instances
 */
export const cleanupTooltips = (instances: TooltipInstance[]) => {
  instances.forEach((instance) => instance.cleanup());
};

/**
 * Initializes tooltips in Rich Text elements.
 * @param rctElements
 * @param globalSettings
 * @return - An array of tooltip instances with cleanup functions.
 */
export const initRctTooltips = (rctElements: HTMLDivElement[], globalSettings: GlobalSettings) => {
  const rctTooltip = queryElement('tooltip-template');
  if (!rctTooltip) return [];

  const rctInstances: TooltipInstance[] = [];

  rctElements.forEach((element) => {
    const tooltipTargets = element.querySelectorAll<HTMLElement>('[fs-tooltip-content]');

    tooltipTargets?.forEach((rctTarget) => {
      // clone tooltip template
      const clonedTooltip = rctTooltip.cloneNode(true) as HTMLElement;

      // set tooltip content based on fs-tooltip-content attribute
      clonedTooltip.textContent = getAttribute(rctTarget, 'content') || 'Tooltip is not configured properly!';
      clonedTooltip.style.display = 'none';
      clonedTooltip.style.position = 'absolute';
      clonedTooltip.style.width = 'max-content';

      // set target as relative and tooltip as child of target
      rctTooltip.style.position = 'relative';
      rctTarget.appendChild(clonedTooltip);

      const rctInstance = setupTooltip(rctTarget, clonedTooltip, globalSettings, undefined);

      rctInstances.push(rctInstance);
    });
  });

  return rctInstances;
};
