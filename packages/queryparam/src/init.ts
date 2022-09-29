import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_FILTER_ATTRIBUTE, QUERY_PARAM_ATTRIBUTE } from '$global/constants/attributes';

import { queryParamFactory } from './factory';
import { ATTRIBUTES } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<void> => {
  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;

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

  window.fsAttributes[QUERY_PARAM_ATTRIBUTE].resolve?.(undefined);
};
