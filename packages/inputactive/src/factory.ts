import { addListener, isHTMLInputElement } from '@finsweet/ts-utils';

import { handleInputActiveClass } from './actions/classes';

/**
 * Inits adding/removing active CSS classes from input fields.
 * @returns A cleanup callback.
 */
export const initInputActiveClasses = () => {
  // Set initial state
  const allInputs = document.querySelectorAll('input');
  allInputs.forEach(handleInputActiveClass);

  // Listen for changes
  const cleanup = addListener(window, 'change', (e) => {
    const { target } = e;

    if (!isHTMLInputElement(target)) return;

    handleInputActiveClass(target);
  });

  return cleanup;
};
