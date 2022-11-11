/**
 * 
 * @returns {string} - GraphQL query string
 */

export const productByIdQuery = () => {
  return `query productById($id: ID!) {
      product(id: $id) {
        id
        title
        description
        descriptionHtml
        handle
        createdAt
        updatedAt
        publishedAt
        featuredImage {
          url
        }
        tags
        variants(first: 10) {
          nodes {
            id
            sku
            title
            unitPrice {
              amount
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            image {
              url
            }
            weight
            weightUnit
          }
        }
        productType
        vendor
      }
    }  
    `
}
