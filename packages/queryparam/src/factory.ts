import { FORM_CSS_CLASSES, isHTMLInputElement, isHTMLSelectElement, isHTMLTextAreaElement } from '@finsweet/ts-utils';

export function queryParamFactory(elements: HTMLElement[], value: string) {
  for (const element of elements) {
    // checkbox
    const checkboxField = element.closest(`.${FORM_CSS_CLASSES.checkboxField}`);
    const checkbox = checkboxField ? checkboxField.querySelector('input') : null;

    if (checkbox) {
      checkbox.checked = true;
      continue;
    }

    // radio
    const radioField = element.closest(`.${FORM_CSS_CLASSES.radioField}`);
    const radio = radioField ? radioField.querySelector('input') : null;

    if (radio) {
      const form = radio.closest('form');

      if (form) {
        const groupRadios = [...form.querySelectorAll<HTMLInputElement>(`input[name="${radio.name}"]`)];
        const targetRadio = groupRadios.find((radio) => radio.value === value);

        if (targetRadio) {
          targetRadio.checked = true;
        }
        continue;
      }
    }

    // select, textarea and input
    if (
      isHTMLSelectElement(element) ||
      isHTMLTextAreaElement(element) ||
      (isHTMLInputElement(element) && element.type !== 'button')
    ) {
      element.value = value;
      continue;
    }

    // all other cases, just replace the textContent
    element.textContent = value;
  }
}
