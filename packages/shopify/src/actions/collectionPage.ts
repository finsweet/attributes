import type { ShopifyClient } from '../shopifyClient';
import { COLLECTION_ID_PREFIX, COLLECTION_IMAGE, collectionAttributes, QUERY_PARAMS } from '../utils/constants';
import { extractStringBetweenBrackets } from '../utils/extractStringBetweenBrackets';
import { getSettingSelector, queryAllElements, queryElement } from '../utils/selectors';
import type {
  CollectionAttribute,
  CollectionValue,
  GlobalSettings,
  ProductAttribute,
  ShopifyCollection,
} from '../utils/types';
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

export const collectionPageInit = async (client: ShopifyClient, globalSettings: GlobalSettings) => {
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
    const selector = getSettingSelector('collectionid');
    const sanitizedSelector = extractStringBetweenBrackets(selector);

    document.body.setAttribute(sanitizedSelector, idParamValue);

    const collectionContainer = document.querySelector<HTMLDivElement>(`${selector}`) as HTMLDivElement;

    const productListElement = queryElement<HTMLElement>('products' as ProductAttribute, {
      scope: collectionContainer,
    }) as HTMLDivElement;

    productListElement.setAttribute(sanitizedSelector, idParamValue);

    await bindCollectionProductsData(client, productListElement, globalSettings, handleParamValue, document.body);
  } catch (e) {
    console.error('collectionPageInit', e);
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
  const { id, description, handle, title, image, updatedAt } = collection;
  const url = image?.url || '';

  const collectionValues = [id.replace(COLLECTION_ID_PREFIX, ''), title, description, handle, url, updatedAt];

  collectionAttributes.forEach((attribute: string, index: number) => {
    const matchedElements = queryAllElements<HTMLElement>(attribute as CollectionAttribute, {
      scope: parentElement,
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
