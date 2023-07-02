import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { queryParamFactory } from './factory';
import { SETTINGS } from './utils/constants';
import { getSettingSelector } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const url = new URL(window.location.href);

  for (const [paramKey, paramValue] of [...url.searchParams]) {
    const queryParamElements = [
      ...document.querySelectorAll<HTMLElement>(getSettingSelector('name', undefined, paramKey)),
    ];

    if (queryParamElements.length < 1) {
      continue;
    }

    queryParamFactory(queryParamElements, paramValue);

    if (window.fsAttributes.process.has('cmsfilter')) {
      continue;
    }

    const removeParamFromUrl = queryParamElements.some((element) => {
      return element.hasAttribute(SETTINGS.removequery.key);
    });

    if (removeParamFromUrl) {
      url.searchParams.delete(paramKey);
    }
  }

  history.replaceState(null, '', url.toString());

  return {};
};
