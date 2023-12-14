import type { ShopifyClient } from '../shopifyClient';
import { PRODUCT_ID_PREFIX, QUERY_PARAMS } from '../utils/constants';
import type { ShopifyProduct } from '../utils/types';
import { bindProductDataGraphQL } from './product';

export const productPageInit = async (client: ShopifyClient) => {
  const { redirectURL, productPage, collectionPage } = client.getParams();

  const { id, handle } = QUERY_PARAMS;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const idParamValue = urlParams.get(id);
  const handleParamValue = urlParams.get(handle);
  if (!idParamValue && !handleParamValue) {
    window.location.href = redirectURL as string;
    return;
  }

  try {
    let productGraphQl: ShopifyProduct;
    if (idParamValue) {
      productGraphQl = await client.fetchProductByIDGraphQL(`${PRODUCT_ID_PREFIX}${idParamValue}`);
    } else if (handleParamValue) {
      productGraphQl = await client.fetchProductByHandleGraphQL(handleParamValue);
    } else {
      window.location.href = redirectURL as string;
      return;
    }

    console.log('productGraphQl', productGraphQl);

    bindProductDataGraphQL(document.body, productGraphQl, {
      productPage: productPage as string,
      collectionPage: collectionPage as string,
    });
  } catch (e) {
    console.log('productPageInit', e);
  }
};
