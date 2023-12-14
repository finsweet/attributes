import { cloneNode } from '@finsweet/attributes-utils';

import {
  IMAGE,
  PRODUCT_TAG_LIST,
  PRODUCT_THUMBNAIL,
  productAttributes,
  PRODUCTS_COLLECTION,
  PRODUCTS_VARIANT_SEPARATOR,
  SHOPIFY_ELEMENT_ATTRIBUTE,
} from '../utils/constants';
import { queryAllElements, queryElement } from '../utils/selectors';
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
    const template = queryElement<HTMLElement>('tag-template', {
      scope: element,
    });

    if (template && template.parentElement) {
      const templateParent = template.parentElement;
      tags.forEach((tag) => {
        const clone = cloneNode(template, true);
        const tagText = queryElement<HTMLElement>('tag-text', {
          scope: clone,
        });
        clone.removeAttribute(SHOPIFY_ELEMENT_ATTRIBUTE);
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
 * Bind the product variant data to the elements.
 * @param variant is the variant data.
 */
export function bindProductVariant(
  parentElement: HTMLElement,
  product: ShopifyProduct,
  variant: Variant,
  options: ShopifyBindingOptions
) {
  const {
    id,
    title,
    description,
    handle,
    createdAt,
    updatedAt,
    publishedAt,
    vendor,
    productType,
    featuredImage,
    tags,
  } = product;
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
    const matchedElements = queryAllElements<HTMLElement>(attribute as ProductAttribute, {
      scope: parentElement,
    });

    matchedElements.forEach((element) => {
      if (propertyActions[attribute]) {
        propertyActions[attribute](element, productValues[index] as string);
        return;
      }
      element.innerHTML = String(productValues[index]);
    });
  });
  handleProductLink(parentElement, { id, handle, productOptions: options });
  handleCollectionLink(parentElement, { productOptions: options });
}

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
  const { variants } = product;

  const variantMaps: { [k: string]: Variant } = {};

  variants.nodes.forEach((variant) => {
    variantMaps[variant.title] = variant;
  });

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
              bindProductVariant(parentElement, product, variant, options);
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
          bindProductVariant(parentElement, product, variant, options);
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
