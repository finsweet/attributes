import { queryAllElements } from '../utils';
import { type CountryData } from '../utils/types';

export const initInfoFields = (countriesData: CountryData[], userCountryCode?: string) => {
  if (!userCountryCode) {
    return;
  }

  const userCountry = countriesData.find((country) => country.cca2 === userCountryCode);
  if (!userCountry) {
    return;
  }

  const fullNameFields = queryAllElements('full-name');
  const twoLetterFields = queryAllElements('two-letter');
  const callingCodeFields = queryAllElements('calling-code');
  const currencyFields = queryAllElements('currency');

  // Extract relevant information from the user's country object
  const fullName = userCountry.name.common;
  const twoLetter = userCountry.cca2;
  const callingCode = userCountry.idd.root + userCountry.idd.suffixes;
  const { currencies } = userCountry;
  const firstCurrency = Object.keys(currencies)[0];
  const currency = currencies[firstCurrency].symbol;

  fullNameFields.forEach((field) => {
    field.innerHTML = fullName;
  });

  twoLetterFields.forEach((field) => {
    field.innerHTML = twoLetter;
  });

  callingCodeFields.forEach((field) => {
    field.innerHTML = callingCode;
  });

  currencyFields.forEach((field) => {
    field.innerHTML = currency;
  });
};
