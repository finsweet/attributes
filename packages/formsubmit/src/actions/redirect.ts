/**
 * Redirects the user to a new URL.
 * @param url
 * @param newTab Defines if the new URL should be openened in a new tab.
 */
export const redirectUser = (url: string, newTab?: boolean) => {
  if (newTab) window.open(url, '_blank');
  else window.location.href = url;
};
