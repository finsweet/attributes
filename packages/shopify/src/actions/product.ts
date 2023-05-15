import { cloneNode } from '@finsweet/ts-utils';

import {
  ATTRIBUTES,
  IMAGE,
  PRODUCT_TAG_LIST,
  PRODUCT_TAG_TEMPLATE,
  PRODUCT_TAG_TEXT,
  PRODUCT_THUMBNAIL,
  productAttributes,
  PRODUCTS_COLLECTION,
  PRODUCTS_VARIANT_SEPARATOR,
  queryElement,
} from '../utils/constants';
import type { ProductAttribute, ProductValue, ShopifyBindingOptions, ShopifyProduct, Variant } from '../utils/types';
import { handleCollectionLink, handleProductLink } from './util';

/**
 * Defines the actions to update element properties.
 * @param element is the element to update.
 * @param value is the value to set.
 */
const propertyActions: Record<string, (element: HTMLElement, value: ProductValue) => void> = {
  [IMAGE]: (element: HTMLElement, value: ProductValue) => {
    element.setAttribute('src', String(value));
  },

  [PRODUCTS_COLLECTION]: (element: HTMLElement, value: ProductValue) => {
    if (value) element.textContent = String(value);
  },

  [PRODUCT_THUMBNAIL]: (element: HTMLElement, value: ProductValue) => {
    element.setAttribute('src', String(value));
  },
  [PRODUCT_TAG_LIST]: (element: HTMLElement, value: ProductValue) => {
    const tags = value as string[];
    const template = queryElement<HTMLElement>(PRODUCT_TAG_TEMPLATE, {
      scope: element,
    });

    if (template && template.parentElement) {
      const templateParent = template.parentElement;
      tags.forEach((tag) => {
        const clone = cloneNode(template, true);
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
 * Bind the product data to the elements.
 * @param parentElement that contains the elements to update.
 * @param product is the product data.
 * @param options are the binding options.
 */
export const bindProductDataGraphQL = (
  parentElement: HTMLElement,
  product: ShopifyProduct,
  options: ShopifyBindingOptions
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

  const variantMaps: { [k: string]: Variant } = {};

  variants.nodes.forEach((variant) => {
    variantMaps[variant.title] = variant;
  });

  /**
   * Bind the product variant data to the elements.
   * @param variant is the variant data.
   */
  function bindProductVariant(variant: Variant) {
    const { sku, price, compareAtPrice, image, weight, weightUnit } = variant;
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
      options.collectionName || '',
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
    handleCollectionLink(parentElement, { productOptions: options });
  }

  const firstTemplate = queryElement<HTMLElement>('optiontemplate', {
    scope: parentElement,
  });
  if (!firstTemplate || !firstTemplate.parentElement) {
    return;
  }

  const templateParent = firstTemplate.parentElement;
  templateParent.innerHTML = '';
  const template = cloneNode(firstTemplate, true);

  const selectedVariantKey = product.options.map(() => '');

  const firstOptionInputs: HTMLInputElement[] = [];
  product.options.forEach((option, index) => {
    const clone = cloneNode(template, true);
    const optionName = queryElement<HTMLElement>('optionname', {
      scope: clone,
    });
    if (optionName) {
      optionName.innerText = option.name;
    }

    // handle variant list
    const variantList = queryElement<HTMLElement>('variantlist', {
      scope: clone,
    });
    const selectElement = clone.querySelector('select');

    if (variantList && variantList.children.length > 0) {
      // use the first element as template
      const childNode = variantList.children[0];
      const template = cloneNode(childNode, true);

      variantList.innerHTML = '';
      option.values.forEach((value) => {
        const clone = cloneNode(template, true);
        const input = clone.querySelector('input');
        if (input) {
          const label = clone.querySelector(`[for='${input.name}']`);
          if (label instanceof HTMLElement) {
            label.innerText = value;
            label.setAttribute('for', `${input.name}-${index}`);
          }
          input.value = value;
          input.setAttribute('name', `${input.name}-${index}`);
          input.addEventListener('change', () => {
            selectedVariantKey[index] = value;
            const variant = variantMaps[selectedVariantKey.join(PRODUCTS_VARIANT_SEPARATOR)];
            if (variant) {
              bindProductVariant(variant);
            }
          });
        }
        variantList.appendChild(clone);
      });

      // select the first one
      const firstInput = variantList.querySelector('input') as HTMLInputElement;
      if (firstInput) {
        firstOptionInputs.push(firstInput);
      }
    } else if (selectElement) {
      selectElement.innerHTML = '';
      option.values.forEach((value) => {
        const optionElement = new Option(value, value);
        selectElement.appendChild(optionElement);
      });
      selectElement.addEventListener('change', () => {
        selectedVariantKey[index] = selectElement.value;
        const variant = variantMaps[selectedVariantKey.join(PRODUCTS_VARIANT_SEPARATOR)];
        if (variant) {
          bindProductVariant(variant);
        }
      });
      selectElement.dispatchEvent(new Event('change'));
    }

    templateParent.appendChild(clone);
  });

  // By default, select the first option of each variant
  firstOptionInputs.forEach((input) => {
    input.click();
  });
};
