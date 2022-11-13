import { productBody } from './product';

/**
 *
 * @returns {string} - GraphQL query string
 */
export const collectionByIdQuery = () => {
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
