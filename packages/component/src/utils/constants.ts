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
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a component source.
   */
  source: {
    key: 'source',
  },

  /**
   * Defines if the CSS of the component should be imported when the component is external.
   * If the component is external and this setting is set to true,
   * the component will be loaded with the CSS inside a Shadow DOM.
   * Defaults to `true`.
   */
  css: {
    key: 'css',
    values: {
      true: 'true',
    },
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
    values: {
      true: 'true',
    },
  },

  /**
   * Defines a CORS Proxy prefix.
   */
  proxy: {
    key: 'proxy',
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
  },

  /**
   * Defines if Webflow should be restarted after rendering the loaded components.
   */
  resetix: { key: 'resetix', values: { true: 'true' } },
} as const satisfies AttributeSettings;
