/**
 * Search for a query i.e. /search?query=hello
 * @param query The search query
 * @returns a promise with the search results
 */
export const search = async (query: string) => {
  const response = await fetch(`/search?query=${query}`);

  // Get the html response and parse it to a DOM element
  const html = await response.text();

  return html;
};
