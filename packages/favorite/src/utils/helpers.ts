import { ADD_TO_LOCAL_STORAGE, REMOVE_FROM_LOCAL_STORAGE } from './constants';
/**
 * Updates the localStorage with the provided link for the specified key.
 * @param link - The link to be added or removed from the localStorage.
 * @param key - The key under which the link is stored in localStorage.
 */
export const addToLocalStorage = (link: string, key: string) => {
  const favorites = (JSON.parse(String(localStorage.getItem(key))) || []) as [string];
  favorites.push(link);
  localStorage.setItem(key, JSON.stringify(favorites));
  const localStorageUpdateEvent = new CustomEvent(ADD_TO_LOCAL_STORAGE, { detail: link });
  window.dispatchEvent(localStorageUpdateEvent);
};

/**
 * Removes the link from the localStorage for the specified key.
 * @param link - The link to be removed from the localStorage.
 * @param key - The key under which the link is stored in localStorage.
 */
export const removeFromLocalStorage = (link: string, key: string) => {
  const favorites = (JSON.parse(String(localStorage.getItem(key))) || []) as [string];
  const updatedFavorites = favorites.filter((item) => item !== link);
  localStorage.setItem(key, JSON.stringify(updatedFavorites));
  const localStorageUpdateEvent = new CustomEvent(REMOVE_FROM_LOCAL_STORAGE, { detail: link });
  window.dispatchEvent(localStorageUpdateEvent);
};

/**
 * Updates the state of the provided button element based on the presence of the href in the localStorage.
 * @param elements - The HTML elements representing the elements to be updated.
 * @param href - The href value associated with the button.
 * @param activeClass - The CSS class to be added to the button when the href is present in localStorage.
 * @param key - The key under which the href values are stored in localStorage.
 */
export const updateElementsClass = (elements: NodeListOf<Element>, href: string, activeClass: string, key: string) => {
  const favorites = JSON.parse(String(localStorage.getItem(key))) || [];
  const isInFavorites = favorites.includes(href);
  elements.forEach((element) => {
    if (isInFavorites) {
      element.classList.add(activeClass);
      return;
    }
    element.classList.remove(activeClass);
  });
};
