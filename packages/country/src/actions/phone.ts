import { closeDropdown, createDropdownItem, geolocateUser, queryElement, setDropdownItemData } from '../utils';
import { type CountryData, type DropdownItem } from '../utils/types';

export const initPhoneInput = (form: HTMLElement, countriesData: CountryData[], userCountryCode?: string) => {
  const dropdown = queryElement('dropdown', { scope: form });
  const list = queryElement('list', { scope: form });
  const code = queryElement('calling-code', { scope: form });
  const flag = queryElement<HTMLImageElement>('flag', { scope: form });

  if (!dropdown || !list) return;

  let items: DropdownItem[] = [];
  let selectedItem: DropdownItem | undefined;
  let listIsOpen = false;
  const dropdownToggle = (dropdown.parentNode || dropdown) as HTMLElement;
  const listWrapper = (list.parentNode || list) as HTMLElement;

  function renderOptions() {
    const itemTemplate = queryElement('item', { scope: form });
    if (!itemTemplate) return;
    items = countriesData.map((countryData) => {
      const element = createDropdownItem(countryData, itemTemplate);
      list?.append(element);
      return {
        ...countryData,
        element,
      };
    });

    list?.removeChild(itemTemplate);
  }

  function addEventListeners() {
    for (const item of items) {
      const { element } = item;
      element.addEventListener('click', () => handleItemSelect(item));
    }
  }

  function observeDropdownList() {
    const observer = new MutationObserver(() => {
      const computedStyle = window.getComputedStyle(listWrapper);
      listIsOpen = computedStyle.display !== 'none';
      if (!listIsOpen) return;

      const item = selectedItem || items[0];
      item.element.focus();
    });

    observer.observe(listWrapper, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  renderOptions();
  addEventListeners();
  observeDropdownList();

  if (userCountryCode) {
    const defaultSelectedCountry = items.find((country) => country.cca2 === userCountryCode);
    if (defaultSelectedCountry) handleItemSelect(defaultSelectedCountry);
  }

  function handleItemSelect(newSelectedItem: DropdownItem) {
    if (selectedItem === newSelectedItem) return;

    selectedItem = newSelectedItem;
    setDropdownItemData(selectedItem, selectedItem.element);

    if (code) code.innerHTML = selectedItem.idd.root + selectedItem.idd.suffixes;
    if (flag) {
      flag.src = selectedItem.flags.svg;
      flag.alt = `${selectedItem.name} Flag`;
    }

    if (listIsOpen) closeDropdown(dropdownToggle);
  }
};
