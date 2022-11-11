/**
 * This script is only available in test environment
 */
import { hideLoaders } from './actions/loaders';
import { initPages } from './factory';
import { ShopifyClient } from './shopifyClient';

declare global {
  interface Window {
    fsShopify: {
      hideLoaders: typeof hideLoaders;
      initPages: typeof initPages;
    };
    ShopifyClient: typeof ShopifyClient;
  }
}

window.fsShopify = {
  hideLoaders,
  initPages,
};
window.ShopifyClient = ShopifyClient;
