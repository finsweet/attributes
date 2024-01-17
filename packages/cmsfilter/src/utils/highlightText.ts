/**
 * Highlights a target string within an HTML string by wrapping it in a span element with a given class.
 * @param {string} htmlString - The HTML string to search within.
 * @param {string} target - The string to highlight.
 * @param {string} wrapperClass - The class to add to the span that wraps the highlighted text.
 * @returns {string} - The modified HTML string with highlighted text.
 */
export const highlightText = (htmlString: string, target: string, wrapperClass: string): string => {
  // Create a DOM parser to convert the HTML string to a DOM object
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  /**
   * Recursively traverse the DOM tree to find and highlight text nodes that contain the target string.
   * @param {Node} node - The current node to check.
   */
  const traverseAndHighlight = (node: Node) => {
    // let next: Node | null = null;
    const childNodesArray = Array.from(node.childNodes);

    for (const child of childNodesArray) {
      // next = child.nextSibling;

      if (child.nodeType === Node.TEXT_NODE) {
        const textContent = child.nodeValue || '';
        const regex = new RegExp(target.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');

        if (regex.test(textContent)) {
          const newNode = document.createElement('span');

          newNode.innerHTML = textContent.replace(regex, (match) => `<span class="${wrapperClass}">${match}</span>`);

          child.replaceWith(...Array.from(newNode.childNodes));
        }
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).classList.contains(wrapperClass)) {
        // Skip nodes that already have the wrapper class to avoid nesting
        continue;
      } else {
        traverseAndHighlight(child);
      }
    }
  };

  traverseAndHighlight(doc.body);

  return doc.body.innerHTML;
};
