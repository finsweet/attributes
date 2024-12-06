import type { FinsweetAttributeKey } from '@finsweet/attributes-utils';
import type { Page } from '@playwright/test';

/**
 * Wait for the attribute to be loaded in the current test page.
 * @param page
 * @param attributeKey
 */
export const waitAttributeLoaded = async (page: Page, attributeKey: FinsweetAttributeKey) => {
  return page.evaluate<Promise<unknown>, FinsweetAttributeKey>(async (attributeKey) => {
    return new Promise((r) => {
      window.finsweetAttributes = window.finsweetAttributes || [];
      window.finsweetAttributes.push([attributeKey, r]);
    });
  }, attributeKey);
};
