import type { AttributeElements, AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines a target where to load the component.
   */
  'target',

  /**
   * Defines a component to be loaded.
   */
  'component',
  'element', // Alias for component
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a component source.
   */
  source: {
    key: 'source',
  },

  /**
   * Defines a specific position of the component inside the target.
   */
  position: { key: 'position' },

  /**
   * Defines if the CSS of the component should be imported when the component is external.
   * If the component is external and this setting is set to true,
   * the component will be loaded with the CSS inside a Shadow DOM.
   * Defaults to `true`.
   */
  css: {
    key: 'css',
    values: ['false'],
  },

  /**
   * Defines if the component should be automatically rendered after loading it.
   * If set to false, the component will be loaded but not rendered,
   * and it will be up to the developer to render it,
   * accessing the node via `Webflow.push([`component`, (componentsData) => {}])`.
   * Defaults to `true`.
   */
  render: {
    key: 'render',
    values: ['true'],
    defaultValue: 'true',
  },

  /**
   * Defines a CORS Proxy prefix.
   */
  proxy: {
    key: 'proxy',
  },

  /**
   * Defines if the component should be loaded from the cache.
   * By default, the component will be loaded from the cache if available.
   * If set to false, the component will never be loaded from the cache.
   */
  cache: {
    key: 'cache',
    values: ['false'],
  },

  /**
   * Defines a cache key for the fetched external components.
   */
  cachekey: {
    key: 'cachekey',
  },

  /**
   * Defines a cache version for the fetched external components.
   */
  cacheversion: {
    key: 'cacheversion',
    isNumeric: true,
  },

  /**
   * Defines if Webflow should be restarted after rendering the loaded components.
   */
  resetix: { key: 'resetix', values: ['true'] },
} as const satisfies AttributeSettings;
