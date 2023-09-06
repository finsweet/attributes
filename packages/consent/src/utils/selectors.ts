import { CONSENT_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  queryElement,
  queryAllElements,
  getInstanceIndex,
  getAttribute,
  hasAttributeValue,
  getSettingSelector,
} = generateSelectors(CONSENT_ATTRIBUTE, ELEMENTS, SETTINGS);

/**
 * Style tag to prevent components to be displayed
 */
export const FS_CONSENT_CSS = /* html */ `<style>${getElementSelector('banner')},${getElementSelector(
  'fixed-preferences'
)},${getElementSelector('preferences')},${getElementSelector('interaction')}{display:none}</style>`;
