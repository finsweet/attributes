import { ATTRIBUTES_PREFIX, SUPPORT_ATTRIBUTE } from '$global/constants/attributes';

const ATTRIBUTES_SUPPORT_QUERY_PARAM = `${ATTRIBUTES_PREFIX}-${SUPPORT_ATTRIBUTE}`;

/**
 * Imports the Attributes Support Wizard and mounts it on the page.
 * It stores the import as a Promise to ensure it isn't mounted more than once.
 *
 * @returns A promise that resolves to `true` if the app was successfuly loaded.
 */
export const importSupport = async () => {
  const { fsAttributes, location } = window;
  const { host, searchParams } = new URL(location.href);

  if (!host.includes('webflow.io') || !searchParams.has(ATTRIBUTES_SUPPORT_QUERY_PARAM)) return false;

  // TODO: Remove optional chaining once support for {@link window.fsAttributes.import} has rolled out
  return fsAttributes.import?.(SUPPORT_ATTRIBUTE, '1');
};
