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

  // init resetix setting
  const resetIx = globalSettings.resetix === 'true';

  const modulesToRestart: Parameters<typeof restartWebflow>['0'] = ['slider'];
  if (resetIx) modulesToRestart.push('ix2');

  // Restart ix2 and slider modules
  await restartWebflow(modulesToRestart);

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
