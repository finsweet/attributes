export { version } from '../package.json';

export { CMSList } from './CMSList';
export { CMSItem } from './CMSItem';
export { CMSCore } from './utils/types';

export { importCMSCore } from './utils/import';
export { normalizePropKey } from './utils/props';
export { fetchPageDocument } from './utils/fetch';
export { checkCMSCoreVersion } from './utils/versioning';
export { addListAnimation, addItemsAnimation } from './utils/animation';
export { createCMSListInstances, createCMSListInstance } from './factory';
