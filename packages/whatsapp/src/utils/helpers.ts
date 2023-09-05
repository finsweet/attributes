/**
 * Formats a url with the given params as query params
 * @param url The url to format
 * @param params The params to append to the url
 * @returns The formatted url
 */
export const formatUrl = (url: string, params: { [key: string]: string }): string => {
  const urlObject = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    urlObject.searchParams.append(key, value);
  }

  return urlObject.href;
};

/**
 * Formats a phone number by removing all non-numeric characters and appending +
 * @param phoneNumber The phone number to format
 * @returns The formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  return '+' + phoneNumber.replace(/[^0-9]/g, '');
};
