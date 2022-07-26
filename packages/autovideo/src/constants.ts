import { AUTO_VIDEO_ATTRIBUTE } from '@global/constants/attributes';
import { generateSelectors } from '@global/factory/selectors';

const ATTRIBUTES_PREFIX = `fs-${AUTO_VIDEO_ATTRIBUTE}`;

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {},
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
