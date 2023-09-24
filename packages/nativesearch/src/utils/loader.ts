export const showLoader = (loaderElement: HTMLElement | null) => {
  if (!loaderElement) return;

  // set display to block
  loaderElement.style.display = 'block';
};

export const hideLoader = (loaderElement: HTMLElement | null) => {
  if (!loaderElement) return;

  // set display to none
  loaderElement.style.display = 'none';
};
