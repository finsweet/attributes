import { cloneNode, simulateEvent } from '@finsweet/attributes-utils';

import { COUNTRIES_ENDPOINT, GEOLOCATION_ENDPOINT } from './constants';
import { queryElement } from './selectors';
import { type CountryData } from './types';

/**
 * Fetches the countries data.
 * @returns An array of {@link CountryData} objects.
 */
export const getCountriesData = async (): Promise<CountryData[]> => {
  try {
    const response = await fetch(COUNTRIES_ENDPOINT);
    return (await response.json()) as CountryData[];
  } catch (e) {
    return [];
  }
};

/**
 * Creates a dropdown item from the country data.
 * @param countryData
 * @param itemTemplate
 * @returns The new dropdown item element.
 */
export const createDropdownItem = (countryData: CountryData, itemTemplate: HTMLElement) => {
  const element = cloneNode(itemTemplate);
  setDropdownItemData(countryData, element);
  const flag = queryElement<HTMLImageElement>('flag', { scope: element });
  if (flag) {
    flag.src = countryData.flags.svg;
    flag.alt = `${countryData.name} Flag`;
  }
  return element;
};

/**
 * Sets the data for a dropdown item.
 * @param countryData
 * @param element
 * @returns
 */
export const setDropdownItemData = ({ name, flags, idd, cca2 }: CountryData, element: HTMLElement) => {
  const letter = queryElement('two-letter', { scope: element });
  if (letter) letter.textContent = cca2;
};

/**
 * Closes dropdown.
 * @returns dropdown element.
 */
export function closeDropdown(dropdownToggle: HTMLElement) {
  dropdownToggle.focus();
  simulateEvent(dropdownToggle, ['click', 'mouseup']);
}

/**
 * Locates the user's current country.
 * @returns The country in `cca2` format.
 */
export const geolocateUser = async (): Promise<string | undefined> => {
  const result = await fetch(GEOLOCATION_ENDPOINT);
  const data = await result.text();

  const values = data.match(/[^\r\n]+/g);
  if (!values) return;

  const locationItem = values.find((value) => value.startsWith('loc'));
  if (!locationItem) return;

  return locationItem.split('=')[1];
};
