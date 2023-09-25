import { SEARCH_RESULTS_WRAPPER_CLASS } from './constants';
import { queryElement } from './selectors';

const resultsElement: HTMLElement | null = queryElement('results');

export const results = {
  element: resultsElement,

  show() {
    if (!this.element) return;

    // set display to block
    this.element.style.display = 'block';
  },

  hide() {
    if (!this.element) return;

    // set display to none
    this.element.style.display = 'none';
  },

  /**
   * Displays the search results in the results element by parsing the html string to a DOM element
   * @param htmlString The html string to display
   * @returns void (the results are displayed in the results element)
   */
  display(htmlString: string) {
    // Get the results element
    const resultsElement = queryElement('results');

    if (!resultsElement) return;

    // Parse the html string to a DOM element and get the results wrapper
    const htmlDOM = new DOMParser().parseFromString(htmlString, 'text/html');

    // Get the results wrapper
    const resultsWrapper = htmlDOM.querySelector(`.${SEARCH_RESULTS_WRAPPER_CLASS}`);

    // Append the results to the results element
    resultsElement.innerHTML = resultsWrapper?.innerHTML ?? 'Unable to display results!';
  },
};
