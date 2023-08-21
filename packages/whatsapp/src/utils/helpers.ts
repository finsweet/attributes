export const formatUrl = (url: string, params: { [key: string]: string }): string => {
  const urlObject = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    urlObject.searchParams.append(key, value);
  }

  return urlObject.href;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/[^0-9+]/g, '');
};
