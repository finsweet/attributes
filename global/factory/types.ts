import type { generateDynamicAttibuteValue } from './selectors';

export type AttributeStaticValue = string;
export type AttributeDynamicValue = ReturnType<typeof generateDynamicAttibuteValue>;
export type AttributeValue = AttributeStaticValue | AttributeDynamicValue;
export type AttributeOperator = 'prefixed' | 'suffixed' | 'contains';

/**
 * Global params.
 */
export interface GlobalAttributeParams<AttributeKeys extends Record<string, string>> {
  /**
   * Defines if the `<script>` should prevent automatically loading the library.
   * Useful for cases where a JS developer wants to programatically init the library.
   */
  preventsLoad: boolean;

  /**
   * The parsed custom attributes from the <script> tag.
   */
  attributes: { [Key in keyof AttributeKeys]: string | null };
}
