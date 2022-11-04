import { Debug } from '@finsweet/ts-utils';

import { CMS_CORE_ATTRIBUTE } from '$global/constants/attributes';

import { createImportURL } from './create';

const CMS_CORE_SOURCE = createImportURL(CMS_CORE_ATTRIBUTE, '1');

// TODO: Migrate to unified ESM imports using {@link window.fsAttributes.import}

/**
 * Dynamically imports the `cms/cmscore` package.
 * After the first import, it stores the response in {@link window.fsAttributes.cmscore.import}.
 *
 * Once the import has finished, it also stores the `cmscore` version so other `cms` packages can access it.
 *
 * @returns A `Promise` of the package response.
 */
export const importCMSCore = async () => {
  const { fsAttributes } = window;

  fsAttributes.cmscore ||= {};
  const { cmscore } = fsAttributes;

  if (cmscore.import) return cmscore.import;

  try {
    cmscore.import = import(CMS_CORE_SOURCE);

    cmscore.import.then((cmsCore) => {
      if (cmsCore) cmscore.version ||= cmsCore.version;
    });

    return cmscore.import;
  } catch (error) {
    Debug.alert(`${error}`, 'error');
    return;
  }
};
