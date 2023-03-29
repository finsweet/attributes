/**
 * This regex will match all occurrences of the search string.
 * The regex matches any characters that are not “<” (which is the end of an HTML tag), then matches the search string, then matches any characters that are not “<” again, and finally uses a positive lookahead to match anything that comes before a closing HTML tag. The replace function then replaces all occurrences of the search string within the tag and does not consider casing.
 * @param searchString The query string to search
 * @param htmlString The HTML string to search against
 * @param replacement The string to insert to the matched string
 * @returns modified HTML string
 */
export const findAndReplaceHtmlContent = (searchString: string, htmlString: string, replacement: string) => {
  // normal string that is not HTML
  let regex = new RegExp(searchString, 'gi');

  // if its a valid HTML string approach the regex differently
  if (isHTML(htmlString)) {
    regex = new RegExp(`(?<=>)[^<]*${searchString}[^<]*(?=<)`, 'gi');
  }

  const newHtmlString = htmlString.replace(regex, (match) => {
    return match.replace(searchString, replacement);
  });

  return newHtmlString;
};

/**
 * This uses DOM API to validate string if its a valid HTML or not.
 * @param str
 * @returns {Boolean}
 */
const isHTML = (str: string) => {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};
