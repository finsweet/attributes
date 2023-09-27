import { isNotEmpty } from '@finsweet/attributes-utils';

/**
 * Search for a query i.e. /search?query=hello
 * @param query The search query
 * @returns a promise with the search results
 */
export const searchWebflow = async ({
  query,
  loader,
  results,
}: {
  query: string;
  loader: {
    show: () => void;
    hide: () => void;
  };
  results: {
    show: () => void;
    hide: () => void;
    display: (htmlString: string) => void;
  };
}) => {
  if (!query.trim().length) {
    results.hide();
    return;
  }

  try {
    loader.show();
    // Fetch the search results
    const response = await fetch(`/search?query=${query}`);

    // Get the html response and parse it to a DOM element
    const htmlString = await response.text();

    // Display the results
    results.display(htmlString);
  } catch (error) {
    // reportError(error);
  } finally {
    results.show();
    loader.hide();
  }
};
