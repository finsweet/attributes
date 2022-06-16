import { Debug } from '@finsweet/ts-utils';

import { name } from '../../package.json';
import type { CMSCoreImport } from './types';

const CMS_CORE_SOURCE = `https://cdn.jsdelivr.net/npm/${name}@1/cmscore.js`;
// const CMS_CORE_SOURCE = 'http://localhost:3000/packages/cms/cmscore/cmscore.js';

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
