import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { insertCopiedNode } from './actions/paste';
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
  copyTargets.forEach((target) => insertCopiedNode(target, globalSettings));
  cutTargets.forEach((target) => insertCopiedNode(target, globalSettings));

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
