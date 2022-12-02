import { COPY_CLIP_ATTRIBUTE } from '$global/constants/attributes';
import { ATTRIBUTES as COPYCLIP_ATTRIBUTES } from '$packages/copyclip/src/constants';

import { queryElement } from '../utils/constants';

/**
 * Inits the "Copy to clipboard" buttons.
 * @param copyCode The string to copy on click for the "Copy Script" button.
 */
export const initCopyButtons = (copyCode: string): void => {
  initCopyScriptButton(copyCode);

  window.fsAttributes[COPY_CLIP_ATTRIBUTE].init?.();
};

/**
 * Inits the `Copy Example` functionality.
 * @param copyCode The string to copy on click.
 */
const initCopyScriptButton = (copyCode: string) => {
  const copyScriptButton = queryElement<HTMLAnchorElement>('copyScript');
  if (!copyScriptButton) return;

  for (const [key, value] of [
    [COPYCLIP_ATTRIBUTES.element.key, COPYCLIP_ATTRIBUTES.element.values.trigger],
    [COPYCLIP_ATTRIBUTES.text.key, copyCode],
    [COPYCLIP_ATTRIBUTES.successMessage.key, 'Copied!'],
  ]) {
    copyScriptButton.setAttribute(key, value);
  }
};
