import type { ShopifyClient } from '../shopifyClient';
import {
  ATTRIBUTES,
  collectionAttributes,
  COLLECTION_ID_PREFIX,
  COLLECTION_IMAGE,
  getSelector,
  queryElement,
  QUERY_PARAMS,
} from '../utils/constants';
import type { CollectionAttribute, CollectionValue, ProductAttribute } from '../utils/types';
import { bindCollectionProductsData } from './productsPage';

/**
 * Defines the actions to update element properties.
 */
const propertyActions: Record<string, (element: HTMLElement, value: CollectionValue) => void> = {
  [COLLECTION_IMAGE]: (element: HTMLElement, value: CollectionValue) => {
    if (value && value.length) {
      element.setAttribute('src', String(value));
    }
  },
};

export const collectionPageInit = async (client: ShopifyClient) => {
  try {
    const { redirectURL } = client.getParams();
    const { id } = QUERY_PARAMS;

    const urlParams = new URLSearchParams(window.location.search);
    const idParamValue = urlParams.get(id);

    if (!idParamValue) {
      window.location.href = redirectURL as string;
      return;
    }

    document.body.setAttribute(ATTRIBUTES.collectionId.key, idParamValue);

    const selector = getSelector('collectionId');
    const collectionContainer = document.querySelector<HTMLDivElement>(`${selector}`) as HTMLDivElement;
    const productListElement = queryElement<HTMLElement>('products' as ProductAttribute, {
      scope: collectionContainer,
    }) as HTMLDivElement;
    productListElement.setAttribute(ATTRIBUTES.collectionId.key, idParamValue);
    const collection = await bindCollectionProductsData(client, productListElement);
    if (collection) {
      const { id, description, handle, title, image, updatedAt } = collection;
      const url = image?.url || '';

      const collectionValues = [id.replace(COLLECTION_ID_PREFIX, ''), title, description, handle, url, updatedAt];

      collectionAttributes.forEach((attribute: string, index: number) => {
        const matchedElements = queryElement<HTMLElement>(attribute as CollectionAttribute, {
          scope: document.body,
          all: true,
        });

        matchedElements.forEach((element) => {
          if (productListElement.contains(element)) return;
          if (propertyActions[attribute]) {
            propertyActions[attribute](element, collectionValues[index] as string);
            return;
          }
          element.innerText = String(collectionValues[index]);
        });
      });
    }
  } catch (e) {
    console.log('collectionPageInit', e);
  }
};
