
import { productAttributes, queryElement } from '../utils/constants';
import type { ProductAttribute, ShopifyProduct } from '../utils/types';


export const bindProductDataGraphQl = (parentElement: HTMLElement, product: ShopifyProduct) => {
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
    featuredImage
  } = product;

  const { sku, price, compareAtPrice, image, weight, weightUnit } = variants.nodes[0];
  const discount = 0
  const typeValue = productType


  const productValues = [
    title,
    description,
    handle,
    createdAt,
    updatedAt,
    publishedAt,
    (image || featuredImage).url,
    sku,
    price.amount,
    compareAtPrice?.amount,
    discount || 0,
    typeValue,
    vendor,
    weight,
    weightUnit
  ];

  productAttributes.forEach((attribute: string, index: number) => {
    const matchedElements = queryElement(attribute as ProductAttribute, {
      scope: parentElement,
      all: true,
    });
    matchedElements.forEach((element) => {
      if (attribute === 'image') {
        element.setAttribute('src', String(productValues[index]));
      } else {
        element.textContent = String(productValues[index]);
      }
    });
  });
};
