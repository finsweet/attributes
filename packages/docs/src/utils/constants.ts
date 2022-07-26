import { DOCS_ATTRIBUTE } from '@global/constants/attributes';
import { generateSelectors } from '@global/factory';

export const ATTRIBUTES_PREFIX = `fs-${DOCS_ATTRIBUTE}`;

export const ATTRIBUTES = {
  /**
   * Defines the key elements for copying examples and scripts.
   */
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      code: 'code',
      copyButton: 'copy-button',
      copyButtonText: 'copy-button-text',
      exampleDisplay: 'example-display',
      collapseAllDropdowns: 'collapse-all',
      copyScript: 'copy-script',
      title: 'title',
      titleTarget: 'title-target',
      attributeCard: 'attribute-card',
      attributeTitle: 'attribute-title',
      attributeKey: 'attribute-key',
      attributeVersion: 'attribute-version',
      attributeDate: 'attribute-date',
      attributeChangeset: 'attribute-changeset',
      attributeSelect: 'attribute-select',
      loader: 'loader',
    },
  },

  /**
   * Defines an example to copy.
   */
  example: { key: `${ATTRIBUTES_PREFIX}-example` },

  /**
   * Defines the current attribute.
   * Set to the document body.
   */
  attribute: { key: `${ATTRIBUTES_PREFIX}-attribute` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const OPTIONS_TRIGGER_SELECTOR = '.element_header';
