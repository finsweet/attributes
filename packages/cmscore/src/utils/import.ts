import { Debug } from '@finsweet/ts-utils';

import type { CMSCoreImport } from './types';

/**
 * Defined at {@link @global/build/index.js}
 */
declare const CMS_CORE_SOURCE: string;

/**
 * Dynamically imports the `cms/cmscore` package.
 * After the first import, it stores the response in {@link window.fsAttributes.cms.coreImport}.
 *
 * Once the import has finished, it also stores the `cmscore` version so other `cms` packages can access it.
 *
 * @returns A `Promise` of the package response.
 */
export const importCMSCore = async (): CMSCoreImport => {
  const { fsAttributes } = window;

  fsAttributes.cms ||= {};
  const { cms } = fsAttributes;

  if (cms.coreImport) return cms.coreImport;

  try {
    const cmsCoreImport: CMSCoreImport = import(CMS_CORE_SOURCE);

    cms.coreImport = cmsCoreImport;

    cmsCoreImport.then((cmsCore) => {
      if (cmsCore) cms.coreVersion ||= cmsCore.version;
    });

    return cmsCoreImport;
  } catch (error) {
    Debug.alert(`${error}`, 'error');
    return;
  }
};
