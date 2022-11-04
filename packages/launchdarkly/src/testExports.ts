/**
 * This script is only available in test environment
 */
import { hideLoaders } from './actions/loaders';
import { initFlags } from './factory';

declare global {
  interface Window {
    fsLaunchDarkly: {
      initFlags: typeof initFlags;
      hideLoaders: typeof hideLoaders;
    };
  }
}

window.fsLaunchDarkly = {
  initFlags,
  hideLoaders,
};
