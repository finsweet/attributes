import { CODE_HIGHLIGHT_ATTRIBUTE, RICH_TEXT_ATTRIBUTE } from '@global/constants/attributes';

import { importHighlightJS, importHighlightJSTheme } from './actions/import';
import { ATTRIBUTES, getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<(HTMLElement | undefined)[]> => {
  await window.fsAttributes[RICH_TEXT_ATTRIBUTE]?.loading;

  const referenceElements = [
    ...document.querySelectorAll<HTMLElement>(getSelector('element', 'code', { operator: 'prefixed' })),
  ];

  const theme = referenceElements.reduce<string | null>((theme, referenceElement) => {
    theme ||= referenceElement.getAttribute(ATTRIBUTES.theme.key);
    return theme;
  }, null);

  importHighlightJSTheme(theme);
  await importHighlightJS();

  const codeElements = initHighlight(referenceElements);

  window.fsAttributes[CODE_HIGHLIGHT_ATTRIBUTE].resolve?.(codeElements);

  return codeElements;
};

/**
 * Inits the code highlighting.
 * @param referenceElements The reference elements that hold the `<code>` tags.
 * @returns The highlighted `<code>` elements.
 */
const initHighlight = (referenceElements: HTMLElement[]) => {
  const codeElements = referenceElements.reduce<HTMLElement[]>((acc, referenceElement) => {
    const elements =
      referenceElement.tagName === 'CODE' ? [referenceElement] : referenceElement.querySelectorAll('code');

    acc.push(...elements);

    return acc;
  }, []);

  for (const codeElement of codeElements) window.hljs.highlightElement(codeElement);

  return codeElements;
};
