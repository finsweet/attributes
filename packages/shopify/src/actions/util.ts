import { isHTMLAnchorElement } from '@finsweet/attributes-utils';

import {
  COLLECTION_ID_PREFIX,
  getAttribute,
  getSettingSelector,
  LinkFormat,
  LOADER,
  PRODUCT_ID_PREFIX,
  PRODUCTS_VARIANT_SEPARATOR,
  queryAllElements,
} from '../utils/constants';
import type { Option, ShopifyBindingOptions } from '../utils/types';

export const hideLoader = () => {
  const matchedElements = queryAllElements(LOADER);

  matchedElements.forEach((element) => {
    element.style.display = 'none';
  });
};

export const handleProductLink = (
  parentElement: HTMLElement,
  {
    id,
    handle,
    productOptions: { productPage, linkFormat },
  }: { id: string; handle: string; productOptions: ShopifyBindingOptions }
) => {
  id = id.replace(PRODUCT_ID_PREFIX, '');
  const productLinks = parentElement.querySelectorAll<HTMLAnchorElement>(getSettingSelector('link', 'product'));
  productLinks.forEach((link) => {
    const elementLinkFormat = getAttribute(link, 'linkFormat') || linkFormat || LinkFormat.ID;

    const { protocol, hostname } = window.location;
    const fullURLStr = protocol + hostname + productPage;
    const url = new URL(fullURLStr);

    if (elementLinkFormat === LinkFormat.HANDLE) {
      url.searchParams.set('handle', handle);
    } else {
      url.searchParams.set('id', id);
    }
    link.href = url.toString();
  });
};

/**
 *
 * @param parentElement that contains the elements to update.
 */

export const handleCollectionLink = (
  parentElement: HTMLElement,
  {
    productOptions: { collectionPage, linkFormat, collectionHandle, collectionId },
  }: { productOptions: ShopifyBindingOptions }
) => {
  function addLink(link: HTMLAnchorElement) {
    const elementLinkFormat = getAttribute(link, 'linkFormat') || linkFormat || LinkFormat.ID;
    const { protocol, hostname } = window.location;
    const fullURLStr = protocol + hostname + collectionPage;
    const url = new URL(fullURLStr);

    if (elementLinkFormat === LinkFormat.HANDLE && collectionHandle) {
      url.searchParams.append('handle', collectionHandle);
    } else if (collectionId) {
      url.searchParams.append('id', collectionId.replace(COLLECTION_ID_PREFIX, ''));
    }

    link.href = url.toString();
  }

  if (isHTMLAnchorElement(parentElement)) {
    addLink(parentElement);
    return;
  }

  const collectionLinks = parentElement.querySelectorAll<HTMLAnchorElement>(getSettingSelector('link', 'collection'));
  collectionLinks.forEach((link) => {
    addLink(link);
  });
};

/**
 *@param options Product options.
 takes all possible combination of option values and separate them by /, e.g.
 [{"id":"gid://shopify/ProductOption/8774761119805","name":"Size","values":["Small","Medium","Large"]},{"id":"gid://shopify/ProductOption/8774761152573","name":"Color","values":["Black","Purple"]}]
 will be converted to ["Small / Black", "Small / Purple", "Medium / Black", "Medium / Purple", "Large / Black", "Large / Purple"]
 **/
export const extractAllPossibleVariants = (options: Option[]) => {
  const variants: string[] = [];
  const variant: string[] = [];
  const extract = (index: number) => {
    if (index === options.length) {
      variants.push(variant.join(PRODUCTS_VARIANT_SEPARATOR));
      return;
    }
    options[index].values.forEach((value) => {
      variant.push(value);
      extract(index + 1);
      variant.pop();
    });
  };
  extract(0);
  return variants;
};
