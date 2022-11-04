import { cloneNode, Interaction, isElement, isNode, simulateEvent } from '@finsweet/ts-utils';

const MAIN_KEY = 'fs-uswds';
const ELEMENT_KEY = `${MAIN_KEY}-element`;
const ELEMENT_ATTRIBUTES = {
  toggle: `[${ELEMENT_KEY}="combo-box-toggle"]`,
  clearInput: `[${ELEMENT_KEY}="combo-box-clear-input"]`,
  clearInputInteraction: `[${ELEMENT_KEY}="combo-box-clear-input-ix2"]`,
  listInteraction: `[${ELEMENT_KEY}="combo-box-list-ix2"]`,
} as const;
const FUNCTIONALITY_KEYS = {
  selectedItemClass: `${MAIN_KEY}-selected-class`,
};

type ListElement = HTMLOListElement | HTMLUListElement;
interface ListItemData {
  element: HTMLLIElement;
  text: string;
  value: string;
}

class ComboBox {
  private readonly parentElement: HTMLElement;
  private readonly inputElement: HTMLInputElement;
  private readonly selectElement: HTMLSelectElement;
  private readonly listElement: ListElement;
  private readonly clearInputElementInteraction: Interaction;
  private readonly listElementInteraction: Interaction;
  private readonly listItems: ListItemData[] = [];
  private selectedItemClass?: string | null;
  private selectedListItemElement?: HTMLLIElement;
  private focusedListItemElement?: HTMLLIElement;
  private listIsOpen = false;

  constructor({
    parentElement,
    inputElement,
    selectElement,
    listElement,
    listElementInteraction,
    listItemTemplate,
    clearInputElementInteraction,
  }: {
    parentElement: HTMLElement;
    inputElement: HTMLInputElement;
    selectElement: HTMLSelectElement;
    listElement: ListElement;
    listElementInteraction: HTMLElement;
    listItemTemplate: HTMLLIElement;
    clearInputElementInteraction: HTMLElement;
  }) {
    this.parentElement = parentElement;
    this.inputElement = inputElement;
    this.selectElement = selectElement;
    this.listElement = listElement;

    this.clearInputElementInteraction = new Interaction({ element: clearInputElementInteraction });
    this.listElementInteraction = new Interaction({ element: listElementInteraction });

    this.populateListItems(listItemTemplate);
    this.listenEvents();
  }

  /**
   * Populates all the options in the list.
   * @param listItemTemplate The list item element used as template.
   */
  private populateListItems(listItemTemplate: HTMLLIElement) {
    const {
      selectElement: { options },
      listElement,
      listItems,
    } = this;

    // Make sure the list item template is deleted
    listItemTemplate.remove();

    // Clear existing items
    listElement.innerHTML = '';

    // Get the selected item class name
    this.selectedItemClass = listItemTemplate.getAttribute(FUNCTIONALITY_KEYS.selectedItemClass);
    listItemTemplate.removeAttribute(FUNCTIONALITY_KEYS.selectedItemClass);

    // Populate the items
    [...options].forEach(({ text, value }, index) => {
      if (!value) return;

      const newlistItemElement = cloneNode(listItemTemplate);

      newlistItemElement.setAttribute('tabindex', index === 0 ? '0' : '-1');
      newlistItemElement.setAttribute('role', 'option');

      if (this.selectedItemClass) newlistItemElement.classList.remove(this.selectedItemClass);

      newlistItemElement.textContent = text;

      listElement.appendChild(newlistItemElement);

      listItems.push({ text, value, element: newlistItemElement });
    });

    this.filterListItems();
  }

  /**
   * Listens for internal events
   */
  private listenEvents() {
    const { parentElement } = this;

    parentElement.addEventListener('click', (e) => this.handleClickEvents(e));
    parentElement.addEventListener('keydown', (e) => this.handleKeydownEvents(e));
    parentElement.addEventListener('keyup', (e) => this.handleUpEvents(e));
    parentElement.addEventListener('focusin', (e) => this.handleFocusEvents(e));
    parentElement.addEventListener('input', (e) => this.handleInputEvents(e));
    document.addEventListener('focusin', (e) => this.handleBlur(e));
    document.addEventListener('click', (e) => this.handleBlur(e));
  }

  /**
   * Handles click events
   * @param event The mouse Event
   */
  private handleClickEvents({ target }: MouseEvent) {
    if (!isElement(target)) return;

    if (target.closest(ELEMENT_ATTRIBUTES.toggle)) {
      this.toggleList();
      return;
    }

    if (target.closest('input')) {
      this.toggleList({ action: 'open' });
      return;
    }

    const listItemElement = target.closest('li');
    if (listItemElement) {
      this.selectListItem(listItemElement);
      return;
    }

    const clearInputElement = target.closest(ELEMENT_ATTRIBUTES.clearInput);
    if (clearInputElement) {
      this.clearInput();
    }
  }

  /**
   * Handles keydown events
   * @param event The Keyboard event
   */
  private handleKeydownEvents(e: KeyboardEvent) {
    const { target, key } = e;
    const { inputElement } = this;

    if (!isElement(target)) return;

    if (key === 'Escape') {
      this.toggleList({ action: 'close', focus: 'inputElement' });
      return;
    }

    if (key !== 'ArrowUp' && key !== 'ArrowDown') return;

    e.preventDefault();

    if (target === inputElement && key === 'ArrowDown') {
      this.toggleList({ action: 'open', focus: 'selectedListItemElement' });
      return;
    }

    const listItemElement = target.closest('li');
    if (listItemElement) this.navigateListItems({ key, listItemElement });
  }

  /**
   * Handles keydown events
   * @param event The Keyboard event
   */
  private handleUpEvents(e: KeyboardEvent) {
    const { target, key } = e;
    const { inputElement } = this;

    if (!isElement(target)) return;
    if (key === 'Escape' || key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowRight' || key === 'ArrowLeft') {
      return;
    }

    if (target === inputElement) this.filterListItems({ openList: true });
  }

  /**
   * Handles focus events
   * @param event The focus event
   */
  private handleFocusEvents({ target }: FocusEvent) {
    if (!isElement(target)) return;

    const listItemElement = target.closest('li');
    if (listItemElement) {
      this.focusedListItemElement?.setAttribute('tabindex', '-1');
      listItemElement.setAttribute('tabindex', '0');

      this.focusedListItemElement = listItemElement;
      return;
    }
  }

  /**
   * Handles input events
   * @param event The input event
   */
  private handleInputEvents({ target }: Event) {
    const { inputElement, clearInputElementInteraction } = this;

    if (target !== inputElement) return;

    if (inputElement.value) clearInputElementInteraction.trigger('first');
    else clearInputElementInteraction.trigger('second');
  }

  /**
   * Navigate through the list items with the arrow keys
   * @param params.key The pressed key.
   * @param params.listItemElement The currently focused list item element.
   */
  private navigateListItems({
    key,
    listItemElement,
  }: {
    key: 'ArrowUp' | 'ArrowDown';
    listItemElement: HTMLLIElement;
  }) {
    const { listItems, listElement } = this;

    const itemIndex = listItems.findIndex(({ element }) => element === listItemElement);

    let nextItem: HTMLLIElement | undefined;

    if (key === 'ArrowUp') {
      for (let i = itemIndex - 1; i >= 0; i--) {
        const { element } = listItems[i];
        if (listElement.contains(element)) {
          nextItem = element;
          break;
        }
      }
    }

    if (key === 'ArrowDown') {
      for (let i = itemIndex + 1; i < listItems.length; i++) {
        const { element } = listItems[i];
        if (listElement.contains(element)) {
          nextItem = element;
          break;
        }
      }
    }

    if (!nextItem && key === 'ArrowUp') {
      this.toggleList({ action: 'close', focus: 'inputElement' });
      return;
    }

    nextItem?.focus();
  }

  /**
   * Filters the list items
   */
  private filterListItems({ openList }: { openList?: boolean } = {}) {
    const {
      listElement,
      listItems,
      inputElement: { value },
    } = this;

    const searchValue = value.toLowerCase().trim();

    const matchedItems: HTMLLIElement[] = [];
    const notMatchedItems: HTMLLIElement[] = [];

    listItems.forEach(({ element, text }) => {
      if (!searchValue || text.toLowerCase().trim().includes(searchValue)) matchedItems.push(element);
      else notMatchedItems.push(element);
    });

    notMatchedItems.forEach((item) => item.remove());
    matchedItems.forEach((item, index) => {
      item.setAttribute('aria-posinset', (index + 1).toString());
      item.setAttribute('aria-setsize', matchedItems.length.toString());
      listElement.appendChild(item);
    });

    if (openList) this.toggleList({ action: 'open' });
  }

  /**
   * Handles unfocusing the component.
   * @param event A focus or mouse event.
   */
  private handleBlur({ target }: FocusEvent | MouseEvent) {
    if (!isNode(target)) return;
    if (this.parentElement.contains(target)) return;

    this.toggleList({ action: 'close' });
  }

  /**
   * Handle click events on list items.
   * @param listItemElement
   */
  private selectListItem(listItemElement?: HTMLLIElement) {
    const { selectElement, inputElement, selectedItemClass, selectedListItemElement, listItems } = this;

    const storedItemData = listItemElement
      ? listItems.find(({ element }) => element === listItemElement)
      : { text: '', value: '' };

    if (!storedItemData) return;

    const { text, value } = storedItemData;

    selectElement.value = value;
    inputElement.value = text;
    simulateEvent(inputElement, 'input');

    if (selectedItemClass) {
      selectedListItemElement?.classList.remove(selectedItemClass);
      listItemElement?.classList.add(selectedItemClass);
    }

    this.selectedListItemElement = listItemElement;

    this.toggleList({ action: 'close', focus: 'inputElement' });
  }

  /**
   * Clears the input element.
   */
  private clearInput() {
    const { inputElement } = this;

    this.selectListItem();

    inputElement.value = '';
    inputElement.focus();
  }

  /**
   * Opens/closes the list.
   * @param params.action The action to be performed. If not passed, the list status will be toggled.
   * @param params.focusInputElement If set to true, the input element will automatically be focused.
   */
  private async toggleList({
    action,
    focus,
  }: { action?: 'open' | 'close'; focus?: 'inputElement' | 'selectedListItemElement' } = {}) {
    const { listIsOpen, listElementInteraction, inputElement, listItems, listElement } = this;
    let { selectedListItemElement } = this;

    if (!action) action = listIsOpen ? 'close' : 'open';

    const listWillOpen = action === 'open';

    if (listIsOpen !== listWillOpen) {
      listElementInteraction.trigger(listWillOpen ? 'first' : 'second');
      inputElement.setAttribute('aria-expanded', listWillOpen ? 'true' : 'false');
    }

    if (focus === 'inputElement') inputElement.focus();
    if (focus === 'selectedListItemElement') {
      // If there's no selected element, select the first visible one.
      selectedListItemElement ||= listItems.find(({ element }) => listElement.contains(element))?.element;

      window.requestAnimationFrame(() => selectedListItemElement?.focus());
    }

    this.listIsOpen = listWillOpen;
  }
}

/**
 * Inits all combo boxes.
 */
export const initComboBoxes = (): void => {
  const comboBoxInputs = document.querySelectorAll<HTMLInputElement>('input[role="combobox"]');

  comboBoxInputs.forEach((inputElement) => {
    const { parentElement } = inputElement;
    if (!parentElement) return;

    const selectElement = parentElement.querySelector('select');
    if (!selectElement) return;

    const listElement = parentElement.querySelector<ListElement>('ul, ol');
    const listElementInteraction = parentElement.querySelector<HTMLElement>(ELEMENT_ATTRIBUTES.listInteraction);
    if (!listElement || !listElementInteraction) return;

    const listItemTemplate = listElement.querySelector('li');
    if (!listItemTemplate) return;

    const clearInputElementInteraction = parentElement.querySelector<HTMLElement>(
      ELEMENT_ATTRIBUTES.clearInputInteraction
    );
    if (!clearInputElementInteraction) return;

    new ComboBox({
      parentElement,
      inputElement,
      selectElement,
      listElement,
      listItemTemplate,
      clearInputElementInteraction,
      listElementInteraction,
    });
  });
};
