import { ATTRIBUTES_PREFIX } from '@global/constants/attributes';

const ATTRIBUTES_SUPPORT_QUERY_PARAM = `${ATTRIBUTES_PREFIX}-support`;
const ATTRIBUTES_SUPPORT_SOURCE = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-support@1/support.js';

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

  if (fsAttributes.supportImport) return fsAttributes.supportImport;

  try {
    fsAttributes.supportImport = new Promise((resolve, reject) => {
      const script = document.createElement('script');

      script.src = ATTRIBUTES_SUPPORT_SOURCE;
      script.onload = () => resolve(true);
      script.onerror = reject;

      document.head.append(script);
    });
  } catch (error) {
    return false;
  }

  return fsAttributes.supportImport;
};
