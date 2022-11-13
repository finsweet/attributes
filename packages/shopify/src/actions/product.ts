import {
  ATTRIBUTES,
  getSelector,
  LinkFormat,
  productAttributes,
  PRODUCT_ID_PREFIX,
  PRODUCT_IMAGE,
  PRODUCT_TAG_LIST,
  PRODUCT_TAG_TEMPLATE,
  PRODUCT_TAG_TEXT,
  PRODUCT_THUMBNAIL,
  queryElement,
} from '../utils/constants';
import type { ProductAttribute, ProductOptions, ProductValue, ShopifyProduct } from '../utils/types';

/**
 * Defines the actions to update element properties.
 */
const propertyActions: Record<string, (element: HTMLElement, value: ProductValue) => void> = {
  [PRODUCT_IMAGE]: (element: HTMLElement, value: ProductValue) => {
    element.setAttribute('src', String(value));
  },

  [PRODUCT_THUMBNAIL]: (element: HTMLElement, value: ProductValue) => {
    element.setAttribute('src', String(value));
  },
  [PRODUCT_TAG_LIST]: (element: HTMLElement, value: ProductValue) => {
    const tags = value as string[];
    const template = queryElement<HTMLElement>(PRODUCT_TAG_TEMPLATE, {
      scope: element,
    });

    if (template) {
      const templateParent = template.parentElement as HTMLElement;
      tags.forEach((tag) => {
        const clone = template.cloneNode(true) as HTMLElement;
        const tagText = queryElement<HTMLElement>(PRODUCT_TAG_TEXT, {
          scope: clone,
        });
        clone.removeAttribute(ATTRIBUTES.element.key);
        if (tagText) {
          tagText.innerText = tag;
        }
        templateParent.appendChild(clone);
      });

      template.remove();
    }
  },
};

/**
 *
 * @param parentElement that contains the elements to update.
 * @param product is the product data.
 */
export const bindProductDataGraphQL = (
  parentElement: HTMLElement,
  product: ShopifyProduct,
  options: ProductOptions
) => {
  const {
    id,
    title,
    description,
    handle,
    createdAt,
    updatedAt,
    publishedAt,
    variants,
    vendor,
    productType,
    featuredImage,
    tags,
  } = product;

  const { sku, price, compareAtPrice, image, weight, weightUnit } = variants.nodes[0];
  const discount = 0;
  const typeValue = productType;
  const productImage = (image || featuredImage).url;

  const productValues = [
    title,
    description,
    handle,
    createdAt,
    updatedAt,
    publishedAt,
    productImage,
    productImage,
    sku,
    price.amount,
    compareAtPrice?.amount,
    discount || 0,
    typeValue,
    vendor,
    weight,
    weightUnit,
    tags,
  ];

  productAttributes.forEach((attribute: string, index: number) => {
    const matchedElements = queryElement<HTMLElement>(attribute as ProductAttribute, {
      scope: parentElement,
      all: true,
    });

    matchedElements.forEach((element) => {
      if (propertyActions[attribute]) {
        propertyActions[attribute](element, productValues[index] as string);
        return;
      }
      element.innerText = String(productValues[index]);
    });
  });
  handleProductLink(parentElement, { id, handle, productOptions: options });
};

const handleProductLink = (
  parentElement: HTMLElement,
  {
    id,
    handle,
    productOptions: { productPage, linkFormat },
  }: { id: string; handle: string; productOptions: ProductOptions }
) => {
  id = id.replace(PRODUCT_ID_PREFIX, '');
  const productLinks = parentElement.querySelectorAll<HTMLAnchorElement>(getSelector('link', 'product'));
  productLinks.forEach((link) => {
    let elementLinkFormat = link.getAttribute(ATTRIBUTES.linkFormat.key) as LinkFormat;
    if (!elementLinkFormat) {
      elementLinkFormat = linkFormat || LinkFormat.ID;
    }
    if (linkFormat === LinkFormat.HANDLE) {
      link.href = `${productPage}?handle=${handle}`;
      return;
    }
    link.href = `${productPage}?id=${id}`;
  });
};
