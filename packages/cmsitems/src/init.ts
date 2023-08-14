import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';
import { initBreakpoints } from './actions/breakpoint';

/**
 * Inits the breakpoint attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const listElements = Array.from(document.querySelectorAll('[role="list"]'));

  const breakpointInstances = listElements.map((list: HTMLElement) => initBreakpoints(list));

  return {
    result: breakpointInstances,
    destroy() {
      for (const breakpointInstance of breakpointInstances) breakpointInstance?.clean();
    },
  };
};
