import { ATTRIBUTES_PREFIX } from '$global/constants/attributes';

import { generateSelectors } from './selectors';

/**
 * Constants
 */
export const ATTRIBUTES = {
  /**
   * Defines if an Attributes' `<script>` should prevent automatically loading the library.
   */
  preventLoad: { key: `${ATTRIBUTES_PREFIX}-preventload` },

  /**
   * Defines if an Attributes' `<script>` is set to Debug Mode.
   */
  debugMode: { key: `${ATTRIBUTES_PREFIX}-debug` },

  /**
   * Defines the source of an attribute script.
   */
  src: { key: 'src', values: { finsweet: '@finsweet/attributes' } },

  /**
   * Defines a developer script that is not imported from JsDelivr.
   */
  dev: { key: `${ATTRIBUTES_PREFIX}-dev` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
