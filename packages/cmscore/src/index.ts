export { version } from '../package.json';

export { CMSList } from './CMSList';
export { CMSItem } from './CMSItem';
export { CMSCore } from './utils/types';

export { checkCMSCoreVersion } from './utils/versioning';
export { addListAnimation, addItemsAnimation } from './utils/animation';
export { createCMSListInstances, createCMSListInstance } from './factory';
