import {
  queryElement,
  LOADER,
  ATTRIBUTES,
  COLLECTION_ID_PREFIX,
  getSelector,
  LinkFormat,
  PRODUCT_ID_PREFIX,
  PRODUCTS_VARIANT_SEPARATOR,
} from '../utils/constants';
import type { ShopifyBindingOptions } from '../utils/types';
import type { Option } from '../utils/types';

export const hideLoader = () => {
  const matchedElements = queryElement<HTMLElement>(LOADER, {
    all: true,
  });

  matchedElements.forEach((element: HTMLElement) => {
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
  const productLinks = parentElement.querySelectorAll<HTMLAnchorElement>(getSelector('link', 'product'));
  productLinks.forEach((link) => {
    let elementLinkFormat = link.getAttribute(ATTRIBUTES.linkFormat.key) as LinkFormat;
    if (!elementLinkFormat) {
      elementLinkFormat = linkFormat || LinkFormat.ID;
    }
    if (elementLinkFormat === LinkFormat.HANDLE) {
      link.href = `${productPage}?handle=${handle}`;
      return;
    }
    link.href = `${productPage}?id=${id}`;
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
  const collectionLinks = parentElement.querySelectorAll<HTMLAnchorElement>(getSelector('link', 'collection'));
  collectionLinks.forEach((link) => {
    let elementLinkFormat = link.getAttribute(ATTRIBUTES.linkFormat.key) as LinkFormat;
    if (!elementLinkFormat) {
      elementLinkFormat = linkFormat || LinkFormat.ID;
    }
    if (elementLinkFormat === LinkFormat.HANDLE && collectionHandle) {
      link.href = `${collectionPage}?handle=${collectionHandle}`;
      return;
    }
    if (collectionId) link.href = `${collectionPage}?id=${collectionId.replace(COLLECTION_ID_PREFIX, '')}`;
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
