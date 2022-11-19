import { Sort } from '../utils/constants';
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
export const collectionById = (productSort: Sort) => {
  if (productSort === Sort.MOST_RECENT) {
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
  if (productSort === Sort.OLDEST) {
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
export const collectionByHandle = (productSort: Sort) => {
  if (productSort === Sort.MOST_RECENT) {
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
  if (productSort === Sort.OLDEST) {
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
export const allCollections = (collectionSort: Sort) => {
  if (collectionSort === Sort.MOST_RECENT) {
    return `query collections($collectionLimit: Int) {
      collections(first: $collectionLimit, sortKey: UPDATED_AT) {
          nodes {
            ${collectionProperties}
          }
      }
    }
    `;
  }

  if (collectionSort === Sort.OLDEST) {
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
