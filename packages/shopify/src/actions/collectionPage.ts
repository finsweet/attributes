import type { ShopifyClient } from '../shopifyClient';
import {
  ATTRIBUTES,
  COLLECTION_ID_PREFIX,
  COLLECTION_IMAGE,
  collectionAttributes,
  getSelector,
  QUERY_PARAMS,
  queryElement,
} from '../utils/constants';
import type { CollectionAttribute, CollectionValue, ProductAttribute, ShopifyCollection } from '../utils/types';
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
  const { redirectURL } = client.getParams();
  const { id, handle } = QUERY_PARAMS;

  const urlParams = new URLSearchParams(window.location.search);
  const idParamValue = urlParams.get(id) as string;
  const handleParamValue = urlParams.get(handle) as string;

  if (!idParamValue && !handleParamValue) {
    window.location.href = redirectURL as string;
    return;
  }

  try {
    document.body.setAttribute(ATTRIBUTES.collectionId.key, idParamValue);
    const selector = getSelector('collectionId');
    const collectionContainer = document.querySelector<HTMLDivElement>(`${selector}`) as HTMLDivElement;
    const productListElement = queryElement<HTMLElement>('products' as ProductAttribute, {
      scope: collectionContainer,
    }) as HTMLDivElement;
    productListElement.setAttribute(ATTRIBUTES.collectionId.key, idParamValue);
    await bindCollectionProductsData(client, productListElement, handleParamValue, document.body);
  } catch (e) {
    console.log('collectionPageInit', e);
  }
};

/**
 *
 * @param collection to bind its data to the element
 * @param parentElement that contains the elements to update.
 * @param scopeToExclude  to exclude from the binding.
 */
export const bindCollectionData = (
  collection: ShopifyCollection,
  parentElement: HTMLElement,
  scopeToExclude?: HTMLElement
) => {
  const { id, description, handle, title, image, updatedAt, products } = collection;
  const url = image?.url || '';

  const collectionValues = [id.replace(COLLECTION_ID_PREFIX, ''), title, description, handle, url, updatedAt];

  collectionAttributes.forEach((attribute: string, index: number) => {
    const matchedElements = queryElement<HTMLElement>(attribute as CollectionAttribute, {
      scope: parentElement,
      all: true,
    });
    matchedElements.forEach((element) => {
      if (scopeToExclude && scopeToExclude.contains(element)) return;
      if (propertyActions[attribute]) {
        propertyActions[attribute](element, collectionValues[index] as string);
        return;
      }
      element.innerText = String(collectionValues[index]);
    });
  });
};
