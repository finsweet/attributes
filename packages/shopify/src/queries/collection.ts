import { sortOptions } from '$packages/shopify/src/utils/constants';

import { productBody } from './product';

const collectionProperties = `
        id
        description
        handle
        title
        updatedAt
        image {
          url
        }
`;

/**
 *@param {string} productSort - Sort key
 * @returns {string} - GraphQL query string
 */
export const collectionById = (productSort: string) => {
  if (productSort === sortOptions['most-recent']) {
    return `query collectionById($id: ID!, $productLimit: Int) {
      collection(id: $id) {
        ${collectionProperties}
        products(first: $productLimit, sortKey: CREATED) {
          nodes {
            ${productBody}
          }
        }
      }
    }
    `;
  }
  if (productSort === sortOptions['oldest']) {
    return `query collectionById($id: ID!, $productLimit: Int) {
      collection(id: $id) {
        ${collectionProperties}
        products(first: $productLimit, sortKey: CREATED, reverse: true) {
          nodes {
            ${productBody}
          }
        }
      }
    }
    `;
  }

  return `query collectionById($id: ID!, $productLimit: Int) {
    collection(id: $id) {
      ${collectionProperties}
      products(first: $productLimit) {
        nodes {
          ${productBody}
        }
      }
    }
  }  
  `;
};

/**
 *@param {string} productSort - Sort key
 * @returns {string} - GraphQL query string
 */
export const collectionByHandle = (productSort: string) => {
  if (productSort === sortOptions['most-recent']) {
    return `query collectionByHandle($handle: String!, $productLimit: Int) {
      collection(handle: $handle) {
        ${collectionProperties}
        products(first: $productLimit, sortKey: CREATED) {
          nodes {
            ${productBody}
          }
        }
      }
    }
    `;
  }
  if (productSort === sortOptions['oldest']) {
    return `query collectionByHandle($handle: String!, $productLimit: Int) {
      collection(handle: $handle) {
        ${collectionProperties}
        products(first: $productLimit, sortKey: CREATED, reverse: true) {
          nodes {
            ${productBody}
          }
        }
      }
    }
    `;
  }

  return `query collectionById($handle: String!, $productLimit: Int) {
    collection(handle: $handle) {
      ${collectionProperties}
      products(first: $productLimit) {
        nodes {
          ${productBody}
        }
      }
    }
  }  
  `;
};

/**
 * @param {string} collectionSort - Sort key
 * @returns {string} - GraphQL query string
 */
export const allCollections = (collectionSort: string) => {
  if (collectionSort === sortOptions['most-recent']) {
    return `query collections($collectionLimit: Int) {
      collections(first: $collectionLimit, sortKey: UPDATED_AT) {
          nodes {
            ${collectionProperties}
          }
      }
    }
    `;
  }

  if (collectionSort === sortOptions['oldest']) {
    return `query collections($collectionLimit: Int) {
      collections(first: $collectionLimit, sortKey: UPDATED_AT, reverse: true) {
          nodes {
            ${collectionProperties}
          }
      }
    }
    `;
  }

  return `query collections($collectionLimit: Int) {
    collections(first: $collectionLimit) {
        nodes {
          ${collectionProperties}
        }
    }
  }
  `;
};
