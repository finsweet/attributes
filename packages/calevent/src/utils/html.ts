import type { ELEMENTS } from './constants';
import { queryElement } from './selectors';

/**
 * Minify html by removing new lines, tabs, spaces around tags, and extra spaces.
 * @param html The html to minify.
 * @returns The minified html.
 */
export function minifyHTML(html: string) {
  // Use regular expressions to remove newlines, tabs, spaces around tags, and extra spaces
  return html
    .replace(/\n/g, '')
    .replace(/\t/g, '')
    .replace(/\s*(<[^>]*>)\s*/g, '$1');
}

/**
 * Get the text content of an Html element.
 * @param attributeElement The attribute element i.e 'google', 'outlook'
 * @param instanceIndex The instance index
 * @param scope The element scope
 * @returns The element text content
 */
export function getElementTextContent(
  attributeElement: (typeof ELEMENTS)[number],
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): string | undefined {
  const element = queryElement(attributeElement, { instanceIndex, scope });
  return element?.textContent ?? '';
}

/**
 * Get the html content of an Html element.
 * @param attributeElement The attribute element i.e 'google', 'outlook'
 * @param instanceIndex The instance index
 * @param scope The element scope
 * @returns The element text content
 */
export function getElementHTMLContent(
  attributeElement: (typeof ELEMENTS)[number],
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): string | undefined {
  const element = queryElement(attributeElement, { instanceIndex, scope });

  if (!element) return undefined;

  // minify html and remove new lines and tabs from html
  return minifyHTML(element.innerHTML);
}
