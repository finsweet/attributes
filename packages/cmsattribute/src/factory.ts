/* eslint-disable @typescript-eslint/no-explicit-any */
import slugify from 'slugify';

import { ATTRIBUTES } from './utils/constants';

/**
 * Generates a dynamic attribute and applies it to the target element.
 * @param target
 * @param scope
 */
export function createCMSAttribute(target: HTMLElement, scope: HTMLElement | Document) {
  const targetKey = target.getAttribute(ATTRIBUTES.target.key);
  if (!targetKey) return;

  const value = scope.querySelector<HTMLElement>(`[${ATTRIBUTES.value.key}=${targetKey}]`);
  if (!value || !value.textContent) {
    return;
  }

  const name = scope.querySelector<HTMLElement>(`[${ATTRIBUTES.name.key}=${targetKey}]`);

  try {
    const rawAttributeName = name?.textContent || targetKey;
    const attributeName = slugify(rawAttributeName, { lower: true, strict: true });
    const attributeValue = value.textContent;

    target.setAttribute(attributeName, attributeValue);
  } catch (e) {
    // It will fail silent.
  }
}
