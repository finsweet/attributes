import { CMS_CSS_CLASSES } from '@finsweet/ts-utils';
import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_LOAD_ATTRIBUTE } from 'global/constants/attributes';
import type { CMSList } from 'packages/cmscore/src';

import { createCMSAttribute } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<void> => {
  const targets = document.querySelectorAll<HTMLElement>(getSelector('target'));

  for (const targetElement of targets) {
    const targetScope = targetElement.closest<HTMLElement>(`.${CMS_CSS_CLASSES.item}`) || document;

    createCMSAttribute(targetElement, targetScope);
  }

  const listInstances: CMSList[] = (await window.fsAttributes[CMS_LOAD_ATTRIBUTE]?.loading) || [];

  for (const { items } of listInstances) {
    for (const { element } of items) {
      const cmsItemTargets = element.querySelectorAll<HTMLElement>(getSelector('target'));

      for (const targetElement of cmsItemTargets) {
        createCMSAttribute(targetElement, element);
      }
    }
  }

  window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE].resolve?.(undefined);
};
