import { CODE_HIGHLIGHT_ATTRIBUTE } from 'global/constants/attributes';

import { ATTRIBUTES as CODEHIGHLIGHT_ATTRIBUTES } from '$packages/codehighlight/src/utils/constants';

import { queryElement } from '../utils/constants';

/**
 * Inits rendering and highlighting the Attribute import script.
 * @param copyCode The string to display and highlight.
 */
export const initCodeHighlight = (copyCode: string) => {
  const embedElement = queryElement('code');
  if (!embedElement) return;

  const preElement = document.createElement('pre');
  const codeElement = document.createElement('code');

  preElement.appendChild(codeElement);
  embedElement.appendChild(preElement);

  embedElement.setAttribute(CODEHIGHLIGHT_ATTRIBUTES.element.key, CODEHIGHLIGHT_ATTRIBUTES.element.values.code);

  codeElement.innerHTML = copyCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt');

  window.fsAttributes[CODE_HIGHLIGHT_ATTRIBUTE].init?.();

  return codeElement;
};
