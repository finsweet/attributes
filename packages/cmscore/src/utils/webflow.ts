import type { WebflowModule } from '@finsweet/ts-utils';
import { restartWebflow } from '@finsweet/ts-utils';

import type { CMSItem, CMSList } from '..';

/**
 * Restarts the required Webflow modules after rendering items to the DOM.
 *
 * @param renderedItems The `CMSItem` instances that have been rendered.
 * @param listInstance The {@link CMSList} instance.
 *
 * @returns An awaitable Promise.
 */
export const restartWebflowModules = async (
  renderedItems: CMSItem[],
  {
    items,
    restartWebflow: mustRestartWebflow,
    restartIx,
    restartCommerce,
    restartLightbox,
    restartSliders,
    restartTabs,
  }: CMSList
) => {
  const modulesRelationship: [boolean, WebflowModule][] = [
    [restartIx, 'ix2'],
    [restartCommerce, 'commerce'],
    [restartLightbox, 'lightbox'],
    [restartSliders, 'slider'],
    [restartTabs, 'tabs'],
  ];

  if (!mustRestartWebflow && !modulesRelationship.some(([mustRestart]) => mustRestart)) return;
  if (!renderedItems.some(({ needsWebflowRestart }) => needsWebflowRestart)) return;

  for (const item of items) {
    const rendered = renderedItems.includes(item);

    item.needsWebflowRestart = !rendered;
  }

  if (mustRestartWebflow) {
    await restartWebflow();
    return;
  }

  const modulesToRestart = modulesRelationship.reduce<WebflowModule[]>((modulesToRestart, [mustRestart, module]) => {
    if (mustRestart) modulesToRestart.push(module);

    return modulesToRestart;
  }, []);

  await restartWebflow(modulesToRestart);
};
