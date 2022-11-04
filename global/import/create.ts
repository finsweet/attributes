/**
 * Defined at {@link @global/build/index.js}
 */
declare const NODE_ENV: 'production' | 'development' | 'test';

/**
 * Creates a CDN Import URL for an Attribute.
 * @param attributeKey
 * @param version Defaults to '1'
 */
export const createImportURL = (
  attributeKey: string,
  version: `${number}` | `${number}.${number}` | `${number}.${number}.${number}` = '1',
  format: 'iife' | 'esm' = 'iife'
) => {
  const development = NODE_ENV === 'development' || NODE_ENV === 'test';
  const fileName = `${attributeKey}${format === 'esm' ? '.esm' : ''}.js`;

  return development
    ? `http://localhost:3000/packages/${attributeKey}/${fileName}`
    : `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${attributeKey}@${version}/${fileName}`;
};
