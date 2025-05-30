import { extractCommaSeparatedValues, isNotEmpty, RICH_TEXT_BLOCK_CSS_CLASS } from '@finsweet/attributes-utils';

import { getAttribute, getInstance, hasAttributeValue, queryAllElements } from '../utils/selectors';
import type { ComponentTargetData } from '../utils/types';

const RICHTEXT_COMPONENT_REGEX = /\{\{([^=}"]+)(?:="([^"]*)")?\}\}/;

/**
 * Collects the component targets.
 */
export const collectComponentTargetsData = () => {
  const targetElements = queryAllElements('target');

  const targetsData = targetElements.map((target) => collectComponentTargetData(target)).filter(isNotEmpty);

  const richTextBlocks = document.querySelectorAll(`.${RICH_TEXT_BLOCK_CSS_CLASS}`);

  for (const rtb of richTextBlocks) {
    const children = [...rtb.querySelectorAll('*')];

    for (const child of children) {
      const match = child.innerHTML.match(RICHTEXT_COMPONENT_REGEX);
      if (!match) continue;
      if (targetsData.some((data) => data.target === child)) continue;

      const targetData = collectComponentTargetData(child, match[1], match[2], true);
      if (!targetData) continue;

      targetsData.push(targetData);
    }
  }

  return targetsData;
};

/**
 * Collects a component target data.
 * @param target
 * @param instance
 * @param rawSource
 * @returns The component target data.
 */
const collectComponentTargetData = (
  target: Element,
  instance?: string | null,
  rawSource?: string,
  replace?: boolean
): ComponentTargetData | undefined => {
  instance ||= getInstance(target);
  rawSource ||= getAttribute(target, 'source');

  const proxy = getAttribute(null, 'proxy');
  const rawPosition = getAttribute(target, 'position');
  const noCSS = hasAttributeValue(target, 'css', 'false');
  const autoRender = hasAttributeValue(target, 'render', 'true');
  const resetIx = hasAttributeValue(target, 'resetix', 'true');

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

  return { target, instance, source, proxiedSource, noCSS, autoRender, resetIx, positions, replace };
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
