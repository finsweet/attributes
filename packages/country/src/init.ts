import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initInfoFields } from './actions/info';
import { initPhoneInput } from './actions/phone';
import { geolocateUser, getCountriesData, queryAllElements } from './utils';

/**
 * Inits the country attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const dropdowns = queryAllElements('dropdown');

  const countriesData = await getCountriesData();
  const userCountryCode = await geolocateUser();

  countriesData.sort((a, b) => a.cca2.localeCompare(b.cca2));

  const listsInstances = dropdowns.map((element) => {
    const form = element.closest('form');
    if (form) initPhoneInput(form, countriesData, userCountryCode);
  });

  initInfoFields(countriesData, userCountryCode);

  return {
    result: listsInstances,
  };
};
