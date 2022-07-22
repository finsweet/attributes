import { ATTRIBUTE as CMS_FILTER_ATTRIBUTE } from '@finsweet/attributes-cmsfilter/src/utils/constants';

import { queryParamFactory } from './factory';
import { ATTRIBUTES } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<void> => {
  const url = new URL(window.location.href);

  for (const [paramKey, paramValue] of [...url.searchParams]) {
    const queryParamElements = [...document.querySelectorAll<HTMLElement>(`[${ATTRIBUTES.name.key}="${paramKey}"]`)];

    if (queryParamElements.length < 1) {
      continue;
    }

    queryParamFactory(queryParamElements, paramValue);

    if (window.fsAttributes[CMS_FILTER_ATTRIBUTE]) {
      continue;
    }

    const removeParamFromUrl = queryParamElements.some((element) => {
      return element.hasAttribute(ATTRIBUTES.removeQuery.key);
    });

    if (removeParamFromUrl) {
      url.searchParams.delete(paramKey);
    }
  }

  history.replaceState(null, '', url.toString());
};
