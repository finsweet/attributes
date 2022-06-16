import type { CMSList } from '@finsweet/attributes-cmscore';

import { attributesData } from '../../api/attributes';
import { createChangesetElement } from './dom';
import { getAttributeChangesets } from './fetch';
import { hideLoader } from './loader';
import { initAttributeSelect } from './select';

/**
 * Init
 */
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsload',
  async ([listInstance]: CMSList[]) => {
    if (!listInstance) return;

    const [{ element: templateElement }] = listInstance.items;

    listInstance.clearItems?.(true);

    const addSelectOption = initAttributeSelect();

    await Promise.all(
      attributesData.map(async (attributeData) => {
        const { title } = attributeData;

        addSelectOption(title);

        const changesets = await getAttributeChangesets(attributeData);
        if (!changesets) return;

        const newElements: HTMLDivElement[] = [];

        for (const changeset of changesets) {
          const newElement = createChangesetElement(attributeData, changeset, templateElement);

          newElements.push(newElement);
        }

        await listInstance.addItems(newElements);
      })
    );

    hideLoader();
  },
]);
