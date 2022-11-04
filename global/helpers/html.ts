/**
 * Replaces escaped HTML symbols with their original value.
 * @param rawHTML The raw HTML to unescape.
 */
export const unescapeHTML = (rawHTML: string): string => {
  return rawHTML
    .replace(/(&nbsp;)/g, ' ')
    .replace(/(&lt;)/g, '<')
    .replace(/(&gt;)/g, '>')
    .replace(/(&amp;)/g, '&')
    .replace(/(&quot;)/g, '"')
    .replace(/(&#96;)/g, '`')
    .replace(/(&#x27;)/g, "'")
    .replace(/(<br>)/g, '\n');
};
