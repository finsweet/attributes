import type { AttributeChangesets } from '$global/types/changesets';

import type { AttributesData } from '../utils/types';

/**
 * Fetches the changesets of a specific Attribute package.
 *
 * @param attributeData The Attribute package data.
 *
 * @returns The changesets, if existing.
 */
export const getAttributeChangesets = async ({ baseSrc, changesetsSrc }: AttributesData[number]) => {
  try {
    const response = await fetch(`${baseSrc}/${changesetsSrc}`);

    const changesets: AttributeChangesets = await response.json();

    return changesets;
  } catch (error) {
    return;
  }
};
