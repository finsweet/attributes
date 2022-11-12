import {
  ATTRIBUTES,
  productAttributes,
  PRODUCT_IMAGE,
  PRODUCT_TAG_LIST,
  PRODUCT_TAG_TEMPLATE,
  PRODUCT_TAG_TEXT,
  PRODUCT_THUMBNAIL,
  queryElement,
} from '../utils/constants';
import type { ProductAttribute, ProductValue, ShopifyProduct } from '../utils/types';

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
export const bindProductDataGraphQL = (parentElement: HTMLElement, product: ShopifyProduct) => {
  const {
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
};
