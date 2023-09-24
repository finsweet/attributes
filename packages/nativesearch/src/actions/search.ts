import { SEARCH_RESULTS_WRAPPER_CLASS } from '../utils/constants';
import { hideLoader, showLoader } from '../utils/loader';
import { queryElement } from '../utils/selectors';

/**
 * Search for a query i.e. /search?query=hello
 * @param query The search query
 * @returns a promise with the search results
 */
export const searchWebflow = async (query: string) => {
  // Get the loader element
  const loaderElement = queryElement('loader');

  try {
    showLoader(loaderElement);
    // Fetch the search results
    const response = await fetch(`/search?query=${query}`);

    // Get the html response and parse it to a DOM element
    const htmlString = await response.text();

    // Display the results
    displaySearchResults(htmlString);
  } catch (error) {
    reportError(error);
  } finally {
    hideLoader(loaderElement);
  }
};

/**
 * Displays the search results in the results element by parsing the html string to a DOM element
 * @param htmlString The html string to display
 * @returns void (the results are displayed in the results element)
 */
const displaySearchResults = (htmlString: string) => {
  // Get the results element
  const resultsElement = queryElement('results');

  if (!resultsElement) return;

  // Parse the html string to a DOM element and get the results wrapper
  const htmlDOM = new DOMParser().parseFromString(htmlString, 'text/html');

  // Get the results wrapper
  const resultsWrapper = htmlDOM.querySelector(`.${SEARCH_RESULTS_WRAPPER_CLASS}`);

  // Append the results to the results element
  resultsElement.innerHTML = resultsWrapper?.innerHTML ?? 'Unable to display results!';
};
