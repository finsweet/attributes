import { CMS_LOAD_ATTRIBUTE, VIDEO_HLS_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${VIDEO_HLS_ATTRIBUTE}`;

export const MANIFEST_SETTING_KEY = 'manifest';

export const ATTRIBUTES = {
  /**
   * Defines an HLS manifest URL.
   */
  manifest: {
    key: `${ATTRIBUTES_PREFIX}-${MANIFEST_SETTING_KEY}`,
  },
} as const;

export const [getSelector, queryElement, getAttribute] = generateSelectors(ATTRIBUTES);

export const CMS_LOAD_LIST_ELEMENT_SELECTOR = `[fs-${CMS_LOAD_ATTRIBUTE}-element^="list"]`;
