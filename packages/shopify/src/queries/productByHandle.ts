/**
 * 
 * @returns {string} - GraphQL query string
 */

export const productByHandle = () => {
  return `query productByHandle($handle: String!) {
      product(handle: $handle) {
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
