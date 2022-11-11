import type { ShopifyClient } from '../shopifyClient';
import { PRODUCT_ID_PREFIX, QUERY_PARAMS } from '../utils/constants';
import type { ShopifyProduct } from '../utils/types';
import { bindProductDataGraphQl } from './product';

export const productPagInit = async (client: ShopifyClient) => {
  const { redirectURL } = client.getParams();

  const { id, handle } = QUERY_PARAMS;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const idValue = PRODUCT_ID_PREFIX + urlParams.get(id);
  const handleValue = urlParams.get(handle);

  try {
    let productGraphQl: ShopifyProduct;
    if (urlParams.get(id)) {
      productGraphQl = await client.fetchProductByIDGraphQL(idValue);
    } else if (handleValue) {
      productGraphQl = await client.fetchProductByHandleGraphQL(handleValue);
    } else {
      window.location.href = redirectURL as string;
      return;
    }
    bindProductDataGraphQl(document.body, productGraphQl);
  } catch (e) {
    console.log(e);
    window.location.href = redirectURL as string;
  }
};
