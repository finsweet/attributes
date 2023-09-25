import { isNotEmpty } from '@finsweet/attributes-utils';

import { SEARCH_RESULTS_WRAPPER_CLASS } from '../utils/constants';
import { loader } from '../utils/loader';
import { results } from '../utils/results';
import { queryElement } from '../utils/selectors';

/**
 * Search for a query i.e. /search?query=hello
 * @param query The search query
 * @returns a promise with the search results
 */
export const searchWebflow = async (query: string) => {
  if (isNotEmpty(query) && query.trim() !== '')
    try {
      loader.show();
      // Fetch the search results
      const response = await fetch(`/search?query=${query}`);

      // Get the html response and parse it to a DOM element
      const htmlString = await response.text();

      // Display the results
      results.display(htmlString);
    } catch (error) {
      reportError(error);
    } finally {
      results.show();
      loader.hide();
    }
  else results.hide();
};
