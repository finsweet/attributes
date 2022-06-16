import { LOCALSTORAGE_KEY } from '../utils/constants';
import type { CMSSaveStore } from '../utils/types';

export const initStore = () => {
  const rawStore = window.localStorage.getItem(LOCALSTORAGE_KEY);
  const store = rawStore ? (JSON.parse(rawStore) as CMSSaveStore) : {};
};
