import { FORM_CSS_CLASSES } from '@finsweet/ts-utils';

export class Form {
  public readonly formWrapper;
  public readonly successElement;
  public readonly errorElement;

  constructor(public readonly element: HTMLFormElement) {
    this.formWrapper = element.closest(`.${FORM_CSS_CLASSES.formBlock}`) as HTMLDivElement;
    this.successElement = this.formWrapper.querySelector(`.${FORM_CSS_CLASSES.successMessage}`) as HTMLDivElement;
    this.errorElement = this.formWrapper.querySelector(`.${FORM_CSS_CLASSES.errorMessage}`) as HTMLDivElement;
  }

  showSuccess() {
    this.element.style.display = 'none';
    this.successElement.style.display = 'block';
  }

  showError() {
    this.element.style.display = 'none';
    this.errorElement.style.display = 'block';
  }
}
