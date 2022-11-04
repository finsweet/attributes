import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_LOAD_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { getCMSElementSelector } from '$global/helpers';
import type { CMSList } from '$packages/cmscore/src';

import { createCMSAttribute } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<void> => {
  const targets = document.querySelectorAll<HTMLElement>(getSelector('target'));

  for (const targetElement of targets) {
    const targetScope = targetElement.closest<HTMLElement>(getCMSElementSelector('item')) || document;

    createCMSAttribute(targetElement, targetScope);
  }

  const listInstances: CMSList[] = (await awaitAttributesLoad(CMS_LOAD_ATTRIBUTE))[0] || [];

  for (const { items } of listInstances) {
    for (const { element } of items) {
      const cmsItemTargets = element.querySelectorAll<HTMLElement>(getSelector('target'));

      for (const targetElement of cmsItemTargets) {
        createCMSAttribute(targetElement, element);
      }
    }
  }

  return finalizeAttribute(CMS_ATTRIBUTE_ATTRIBUTE);
};
