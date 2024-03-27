import { isNotEmpty } from '@finsweet/attributes-utils';

import { getAttribute, getInstance, queryAllElements } from '../utils/selectors';
import type { ComponentTargetData } from '../utils/types';

/**
 * Collects the component targets.
 * @param proxy A CORS proxy to use for external sources.
 */
export const collectComponentTargetsData = (proxy?: string | null) => {
  const targetElements = queryAllElements('target');
  const targetsData: ComponentTargetData[] = [...targetElements]
    .map((target) => {
      const instance = getInstance(target);
      const rawSource = getAttribute(target, 'source');
      const rawLoadCSS = getAttribute(target, 'css');
      const rawAutoRender = getAttribute(target, 'render');
      const rawResetIx = getAttribute(target, 'resetix');

      if (!rawSource) return;

      const loadCSS = !rawLoadCSS || rawLoadCSS === 'true';
      const autoRender = !rawAutoRender || rawAutoRender === 'true';
      const resetIx = rawResetIx === 'true';

      let source: URL;
      let proxiedSource: URL | undefined;

      try {
        source = new URL(rawSource, window.location.origin);

        // If source is external, prefix it with the proxy if provided
        if (source.origin !== window.location.origin && proxy) {
          proxiedSource = new URL(proxy + source.href);
        }
      } catch (err) {
        // Source is invalid
        return;
      }

      return { target, instance, source, proxiedSource, loadCSS, autoRender, resetIx };
    })
    .filter(isNotEmpty);

  return targetsData;
};
