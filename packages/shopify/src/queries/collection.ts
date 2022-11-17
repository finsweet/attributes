import { ProductSort } from '../utils/constants';
import { productBody } from './product';

/**
 *
 * @returns {string} - GraphQL query string
 */
export const collectionById = (productSort: ProductSort) => {
  if (productSort === ProductSort.MOST_RECENT) {
    return `query collectionById($id: ID!, $productLimit: Int) {
      collection(id: $id) {
        id
        description
        handle
        title
        updatedAt
        image {
          url
        }
        products(first: $productLimit, sortKey: CREATED) {
          nodes {
            ${productBody}
          }
        }
      }
    }
    `;
  }
  if (productSort === ProductSort.OLDEST) {
    return `query collectionById($id: ID!, $productLimit: Int) {
      collection(id: $id) {
        id
        description
        handle
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
      id
      description
      handle
      products(first: $productLimit) {
        nodes {
          ${productBody}
        }
      }
    }
  }  
  `;
};
