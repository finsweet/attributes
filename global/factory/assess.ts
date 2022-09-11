import { ATTRIBUTES } from './constants';
import type { GlobalAttributeParams } from './types';

/**
 * Checks the global params of the Attribute `<script>`.
 * @param attributeKeys A record with Attribute keys that should be read from the <script> tag.
 *
 * @returns The {@link GlobalAttributeParams}.
 */
export const assessScript = <AttributeKeys extends Record<string, string>>(
  attributeKeys?: AttributeKeys
): GlobalAttributeParams<AttributeKeys> => {
  const { currentScript } = document;

  const attributes = {} as GlobalAttributeParams<AttributeKeys>['attributes'];

  if (!currentScript) {
    return { attributes, preventsLoad: false };
  }

  // Check if the Attribute should not be automatically loaded
  const preventsLoad = typeof currentScript.getAttribute(ATTRIBUTES.preventLoad.key) === 'string';

  // Retrieve <script> Attributes
  const params: GlobalAttributeParams<AttributeKeys> = {
    preventsLoad,
    attributes,
  };

  for (const key in attributeKeys) {
    const value = currentScript.getAttribute(attributeKeys[key]);
    params.attributes[key] = value;
  }

  return params;
};
