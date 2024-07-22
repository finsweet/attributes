import { type FinsweetAttributeInit, waitAttributeLoaded, waitWebflowReady } from '@finsweet/attributes-utils';
import hljs from 'highlight.js/lib/common';

import { importHighlightJSTheme } from './actions/import';
import { getAttribute, queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();
  await waitAttributeLoaded('richtext');

  const referenceElements = queryAllElements('code');

  const theme = referenceElements.reduce<string | undefined>((theme, referenceElement) => {
    theme ||= getAttribute(referenceElement, 'theme');
    return theme;
  }, undefined);

  const destroyHighlightJSThemeImport = await importHighlightJSTheme(theme);

  const codeElements = initHighlight(referenceElements);

  return {
    result: codeElements,
    destroy() {
      destroyHighlightJSThemeImport?.();
    },
  };
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

  for (const codeElement of codeElements) {
    hljs.highlightElement(codeElement);
  }

  return codeElements;
};
