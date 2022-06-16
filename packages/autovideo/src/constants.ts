import { generateSelectors } from '@global/factory/selectors';

export const ATTRIBUTE = 'autovideo';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {},
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
