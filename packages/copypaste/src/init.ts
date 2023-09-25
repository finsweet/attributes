import { type FsAttributeInit, restartWebflow, waitWebflowReady } from '@finsweet/attributes-utils';

import { copyPasteNode, cutPasteNode } from './actions/paste';
import { queryAllElements } from './utils';

/**
 * Initializes the attribute.
 */
export const init: FsAttributeInit = async (globalSettings = {}) => {
  await waitWebflowReady();

  // Gather all elements designated for copying and moving
  const copyTargets = queryAllElements('copy');
  const cutTargets = queryAllElements('cut');

  // Copy and Move all gathered elements respectively
  copyTargets.forEach((target) => copyPasteNode(target));
  cutTargets.forEach((target) => cutPasteNode(target));

  // Perform a resetIX if specified and globalSettings allow it
  if (globalSettings.resetix === 'true') {
    await restartWebflow(['ix2']);
  }
  return {
    result: {
      copyTargets,
      cutTargets,
    },
    destroy() {
      return;
    },
  };
};
