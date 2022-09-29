import { COPY_CLIP_ATTRIBUTE } from 'global/constants/attributes';

import { ATTRIBUTES as COPYCLIP_ATTRIBUTES } from '$packages/copyclip/src/constants';

import { queryElement } from '../utils/constants';

/**
 * Inits the `Copy Example` functionality.
 * @param copyCode The string to copy on click.
 */
export const initCopyScriptButton = (copyCode: string): void => {
  const element = queryElement<HTMLAnchorElement>('copyScript');
  if (!element) return;

  for (const [key, value] of [
    [COPYCLIP_ATTRIBUTES.element.key, COPYCLIP_ATTRIBUTES.element.values.trigger],
    [COPYCLIP_ATTRIBUTES.text.key, copyCode],
    [COPYCLIP_ATTRIBUTES.successMessage.key, 'Copied!'],
  ]) {
    element.setAttribute(key, value);
  }

  window.fsAttributes[COPY_CLIP_ATTRIBUTE].init?.();
};
