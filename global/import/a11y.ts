import { A11Y_ATTRIBUTE } from '$global/constants/attributes';

/**
 * Imports the {@link A11Y_ATTRIBUTE} to the page.
 * @returns The Attribute controls.
 */
export const importA11Y = () => window.fsAttributes.import?.(A11Y_ATTRIBUTE, '1');
// TODO: Remove optional chaining once support for {@link window.fsAttributes.import} has rolled out
