import { CMS_CSS_CLASSES } from '@finsweet/ts-utils';
import { CMS_LOAD_ATTRIBUTE, SOCIAL_SHARE_ATTRIBUTE } from '@global/constants/attributes';
import { getInstanceIndex } from '@global/helpers';
import type { CMSList } from 'packages/cmscore/src';

import { collectFacebookData, collectPinterestData, collectSocialData, collectTwitterData } from './actions/collect';
import { socialShareFactory } from './factory';
import { ATTRIBUTES, queryElement } from './utils/constants';

// Constants destructuring
const {
  element: { key: elementKey },
} = ATTRIBUTES;

/**
 * Inits the attribute.
 */
export const init = async (): Promise<void> => {
  const listInstances: CMSList[] = (await window.fsAttributes[CMS_LOAD_ATTRIBUTE]?.loading) || [];

  const contentElementsSet = new Set([...queryElement<HTMLElement>('content', { operator: 'prefixed', all: true })]);

  for (const { items } of listInstances) {
    for (const { element } of items) {
      const itemContentElements = queryElement<HTMLElement>('content', {
        operator: 'prefixed',
        all: true,
        scope: element,
      });

      for (const itemContentElement of itemContentElements) {
        contentElementsSet.add(itemContentElement);
      }
    }
  }

  const contentElements = [...contentElementsSet];

  contentElements.forEach((contentElement) => {
    const instanceIndex = getInstanceIndex(contentElement, elementKey);

    const cmsListItem = contentElement.closest<HTMLElement>(`.${CMS_CSS_CLASSES.item}`) || undefined;

    const urlElement = queryElement<HTMLElement>('url', { operator: 'prefixed', instanceIndex, scope: cmsListItem });

    const facebook = collectFacebookData(instanceIndex, cmsListItem);
    const twitter = collectTwitterData(instanceIndex, cmsListItem);
    const pinterest = collectPinterestData(instanceIndex, cmsListItem);
    const reddit = collectSocialData('reddit', instanceIndex, cmsListItem);
    const linkedin = collectSocialData('linkedin', instanceIndex, cmsListItem);
    const telegram = collectSocialData('telegram', instanceIndex, cmsListItem);

    const contentText = contentElement.innerText;
    const contentUrl = urlElement ? urlElement.innerText : window.location.href;

    socialShareFactory(contentText, contentUrl, facebook, twitter, pinterest, reddit, telegram, linkedin);
  });

  window.fsAttributes[SOCIAL_SHARE_ATTRIBUTE].resolve?.(undefined);
};
