import { normalizeNumber } from '@finsweet/attributes-utils';

import { getAttribute, getInstanceIndex, getSettingSelector, queryAllElements, queryElement } from '../utils/selectors';
import { handleVisibility } from './handleVisibility';

export const handleClickOrHover = (animation?: string): (() => void) => {
  const allTargets = queryAllElements<HTMLElement>('target');

  const toggleDisplay = (element: HTMLElement, reset?: boolean) => {
    const delay = getAttribute(element, 'delay');
    const toggle = getAttribute(element, 'toggle');
    const elAnimation = getAttribute(element, 'animation');

    // TODO: handle checkbox, if not global element?
    // const checkbox = queryElement<HTMLInputElement>('checkbox', {
    //   scope: document,
    // });

    if (!toggle) return;

    const toggledTarget = document.querySelector<HTMLElement>(toggle);

    if (!toggledTarget) return;

    if (reset) {
      handleVisibility(toggledTarget, elAnimation || animation, true);

      return;
    }

    const delayValue = delay ? normalizeNumber(delay) : false;

    if (!delayValue) {
      handleVisibility(toggledTarget, elAnimation || animation);

      return;
    }

    window.setTimeout(() => {
      handleVisibility(toggledTarget, elAnimation || animation);
    }, delayValue);
  };

  allTargets.forEach((element) => {
    const eventSetting = getSettingSelector('event');
    const keypressTarget = element.querySelector<HTMLElement>(eventSetting) || element;

    if (!keypressTarget) return;

    const event = getAttribute(keypressTarget, 'event');

    if (event === 'hover') {
      keypressTarget.addEventListener('mouseover', (e) => {
        e.stopPropagation();
        e.preventDefault();

        toggleDisplay(keypressTarget);
      });

      keypressTarget.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        e.preventDefault();

        toggleDisplay(keypressTarget, true);
      });
    } else {
      // default to click
      keypressTarget.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        toggleDisplay(keypressTarget);
      });
    }
  });

  // TODO: should mouseout dismiss even click event
  document.addEventListener('click', (e) => {
    allTargets.forEach((element) => {
      const instanceIndex = getInstanceIndex(element);

      const keypressTarget = queryElement('target', { instanceIndex });

      if (!keypressTarget) return;

      // if clicked element is the target, do nothing
      if (e.target === keypressTarget) return;

      toggleDisplay(keypressTarget, true);
    });
  });

  return () => {
    return;
  };
};
