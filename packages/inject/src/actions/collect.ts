import { extractCommaSeparatedValues, isNotEmpty } from '@finsweet/attributes-utils';

import { getAttribute, getInstance, hasAttributeValue, queryAllElements } from '../utils/selectors';
import type { ComponentTargetData } from '../utils/types';

/**
 * Collects the component targets.
 * @param proxy A CORS proxy to use for external sources.
 */
export const collectComponentTargetsData = () => {
  const targetElements = queryAllElements('target');
  const targetsData = [...targetElements]
    .map<ComponentTargetData | undefined>((target) => {
      const instance = getInstance(target);
      const proxy = getAttribute(null, 'proxy');
      const rawPosition = getAttribute(target, 'position');
      const rawSource = getAttribute(target, 'source');
      const rawLoadCSS = getAttribute(target, 'css');
      const rawAutoRender = getAttribute(target, 'render');
      const resetIx = hasAttributeValue(target, 'resetix', 'true');

      const loadCSS = !rawLoadCSS || rawLoadCSS === 'true';
      const autoRender = !rawAutoRender || rawAutoRender === 'true';
      const positions = rawPosition ? extractCommaSeparatedValues(rawPosition).map(getPosition) : [0.5];

      let source: URL | undefined;
      let proxiedSource: URL | undefined;

      if (rawSource) {
        try {
          source = new URL(rawSource, window.location.origin);

          // If source is external, prefix it with the proxy if provided
          if (source.origin !== window.location.origin && proxy) {
            proxiedSource = new URL(proxy + source.href);
          }
        } catch {
          // Source is invalid
          return;
        }
      }

      return { target, instance, source, proxiedSource, loadCSS, autoRender, resetIx, positions };
    })
    .filter(isNotEmpty);

  return targetsData;
};

/**
 * @param rawPosition
 * @returns The position of a component inside the target, as a number between 0 and 1.
 */
const getPosition = (rawPosition: string) => {
  switch (rawPosition) {
    case 'first':
    case 'start': {
      return 0;
    }

    case 'one-quarter': {
      return 0.25;
    }

    case 'one-third': {
      return 0.33;
    }

    case 'middle':
    case 'center':
    case 'half':
    case 'one-half': {
      return 0.5;
    }

    case 'two-thirds': {
      return 0.66;
    }

    case 'three-quarters': {
      return 0.75;
    }

    case 'end':
    case 'last': {
      return 1;
    }

    default: {
      const position = parseFloat(rawPosition);

      return isNaN(position) ? 0.5 : position / 100;
    }
  }
};
