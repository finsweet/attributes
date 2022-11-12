import { productBody } from './product';

/**
 *
 * @returns {string} - GraphQL query string
 */
export const collectionByIdQuery = () => {
  return `query collectionById($id: ID!) {
      collection(id: $id) {
        id
        description
        handle
        products(first: 10) {
          nodes {
            ${productBody}
          }
        }
      }
    }  
    `;
};
