import { setFormFieldValue, simulateEvent } from '@finsweet/attributes-utils';
import Emittery from 'emittery';

import { useStore } from '../Store';
import {
  type Consents,
  DYNAMIC_KEYS,
  OPTIONAL_CONSENTS,
  type OptionalConsentKey,
  type OptionalConsents,
} from '../utils';
import { alert } from './Debug';

// Types
interface ConsentsFormEvents {
  submit: Partial<Consents>;
}

const checkboxes: Map<OptionalConsentKey, HTMLInputElement> = new Map();

export const useConsentForm = (element: HTMLFormElement, store: ReturnType<typeof useStore>) => {
  // const emitter = new Emittery<ConsentsFormEvents>();

  /**
   * Stores the checkboxes and the submit button.
   * If no submit button exists, it creates one.
   */
  const initElements = () => {
    // Check if form contains the all the checkboxes and store them
    const missingCheckboxes = OPTIONAL_CONSENTS.filter((consentKey) => {
      const selector = DYNAMIC_KEYS.checkbox(consentKey);

      const checkbox = element.querySelector<HTMLInputElement>(`input${selector}, ${selector} input`);
      if (!checkbox || !(checkbox.type === 'checkbox')) return true;

      // Make sure it starts unchecked
      if (checkbox.checked) setFormFieldValue(checkbox, false);

      checkboxes.set(consentKey, checkbox);
      return false;
    });

    // Warn the user if any checkbox is missing
    if (missingCheckboxes.length) {
      alert(
        `The Consents Form is missing the following checkboxes: ${missingCheckboxes
          .map((consentKey) => DYNAMIC_KEYS.checkbox(consentKey))
          .join(', ')}.`,
        'warning'
      );
    }
  };

  /**
   * Listens for mouse and keyboard events.
   */
  const listenEvents = (): void => {
    element.addEventListener('submit', (e) => handleSubmit(e));
  };

  /**
   * Handles submit events.
   * @param e The submit event.
   */
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    // Gather the new consents from the form
    const newConsents: Partial<OptionalConsents> = {};
    checkboxes.forEach((checkbox, consentKey) => {
      newConsents[consentKey] = checkbox.checked ?? false;
    });

    emitter.emit('submit', newConsents);
  };

  /**
   * Makes sure the checkboxes are checked/unchecked depending on the user's settings.
   */
  const updateCheckboxes = () => {
    if (!store) return;

    const consents = store.getConsents();

    checkboxes.forEach((checkbox, consentKey) => {
      if (!!consents[consentKey] !== checkbox.checked) setFormFieldValue(checkbox, consents[consentKey]);
    });
  };

  /**
   * Submits the form.
   */
  const submit = (element: HTMLElement) => {
    simulateEvent(element, 'submit');
  };

  const emitter = new Emittery<ConsentsFormEvents>();
  initElements();
  listenEvents();
  updateCheckboxes();

  return {
    updateCheckboxes,
    submit,
    on: (event: keyof ConsentsFormEvents, listener: (payload: Partial<Consents>) => void) => {
      emitter.on(event, listener);
    },
    form: element,
  };
};
