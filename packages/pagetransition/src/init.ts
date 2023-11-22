import barba from '@barba/core';
import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';
import { restartWebflow } from '@finsweet/attributes-utils';
import { simulateEvent } from '@finsweet/attributes-utils';

import { createOverlay, getAttribute, queryElement } from './utils';

/**
 * Inits the transition attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const body = document.querySelector('body');
  const trigger = queryElement('trigger');
  const change = queryElement('change');
  if (!body || !change) return;
  body.setAttribute('fs-pagetransition-element', 'wrapper');
  const delay = Number(getAttribute(change, 'delay')) || 0;

  const overlay = createOverlay();

  barba.init({
    transitions: [
      {
        async enter() {
          overlay.style.pointerEvents = 'auto';
          document.body.style.cursor = 'progress';
          if (trigger) simulateEvent(trigger, 'click');
          await new Promise((resolve) => setTimeout(resolve, 1000));
        },
        async after() {
          await new Promise((resolve) => setTimeout(resolve, delay));
          await restartWebflow();
          document.body.style.cursor = 'auto';
          overlay.style.pointerEvents = 'none';
        },
      },
    ],
    schema: {
      prefix: 'fs-pagetransition-element',
      wrapper: 'wrapper',
      container: 'change',
    },
  });

  return {
    result: barba,
    destroy() {
      barba.destroy();
    },
  };
};
