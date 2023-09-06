import {
  addListener,
  FORM_CSS_CLASSES,
  type FormBlockElement,
  type FormErrorElement,
  type FormSuccessElement,
  simulateEvent,
} from '@finsweet/attributes-utils';

import { redirectUser } from '../actions/redirect';
import { collectPreventResetFields, resetForm } from '../actions/reset';
import { enhancedSubmit } from '../actions/submit';
import {
  checkFormSuccess,
  displayFormSubmitWaitText,
  hideFormError,
  showFormError,
  showFormSuccess,
} from '../utils/dom';

export class Form {
  public readonly form;
  public readonly formBlock;
  public readonly successMessage;
  public readonly errorMessage;
  public readonly submitButtons;
  public readonly destroy;

  private redirect;
  private redirectTimeout;
  private redirectUrl;
  private redirectToNewTab;
  private reset;
  private resetTimeout;
  private reload;
  private reloadTimeout;
  private enhance;
  private disabled;
  private ixTriggers;
  private resetButtons;
  private currentRedirectTimeout?: number | ReturnType<typeof setTimeout>;
  private currentResetTimeout?: number | ReturnType<typeof setTimeout>;
  private currentReloadTimeout?: number | ReturnType<typeof setTimeout>;

  constructor({
    form,
    formBlock,
    reset,
    resetTimeout,
    reload,
    reloadTimeout,
    redirect,
    redirectTimeout,
    redirectUrl,
    redirectToNewTab,
    enhance,
    disable,
    ixTriggers,
    resetButtons,
  }: {
    form: HTMLFormElement;
    formBlock: FormBlockElement;
    reset: boolean;
    resetTimeout?: number;
    reload: boolean;
    reloadTimeout?: number;
    redirect: boolean;
    redirectTimeout?: number;
    redirectUrl?: string | null;
    redirectToNewTab?: boolean;
    enhance: boolean;
    disable: boolean;
    ixTriggers: Element[];
    resetButtons: Element[];
  }) {
    this.form = form;
    this.formBlock = formBlock;
    this.successMessage = formBlock.querySelector(`.${FORM_CSS_CLASSES.successMessage}`) as FormSuccessElement;
    this.errorMessage = formBlock.querySelector(`.${FORM_CSS_CLASSES.errorMessage}`) as FormErrorElement;
    this.submitButtons = [...form.querySelectorAll<HTMLInputElement>('input[type="submit"]')];

    this.redirect = redirect;
    this.redirectTimeout = redirectTimeout;
    this.redirectUrl = redirectUrl;
    this.redirectToNewTab = redirectToNewTab;
    this.reset = reset;
    this.resetTimeout = resetTimeout;
    this.reload = reload;
    this.reloadTimeout = reloadTimeout;
    this.enhance = enhance;
    this.disabled = disable;
    this.ixTriggers = ixTriggers;
    this.resetButtons = resetButtons;

    this.destroy = this.listenEvents();
  }

  /**
   * Listens for internal events.
   */
  private listenEvents() {
    const { form, resetButtons } = this;

    const submitCleanup = addListener(form, 'submit', (e) => this.handleSubmit(e));

    const resetCleanups = resetButtons.map((resetButton) =>
      addListener(resetButton, 'click', () => this.handleReset(false))
    );

    return () => {
      submitCleanup();
      for (const cleanup of resetCleanups) cleanup();
    };
  }

  /**
   * Handles form submissions.
   * @param e The submit event.
   */
  private async handleSubmit(e: SubmitEvent) {
    const { reset, redirect, reload, enhance, disabled } = this;

    let success: boolean;

    if (disabled || enhance) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    if (disabled) return;

    if (enhance) {
      success = await this.handleEnhancedSubmit();
    } else {
      success = await checkFormSuccess(this);
    }

    if (!success) return;

    if (reset) this.handleReset();
    if (redirect) this.handleRedirect();
    if (reload) this.handleReload();

    this.triggerIx();
  }

  /**
   * Resets the form.
   * @param allowTimeout Defines if waiting for the `resetTimeout` is allowed.
   */
  public handleReset(allowTimeout = true) {
    const { form, resetTimeout, currentResetTimeout } = this;

    clearTimeout(currentResetTimeout);
    this.currentResetTimeout = undefined;

    const preventResetFields = collectPreventResetFields(form);

    if (allowTimeout && resetTimeout) {
      this.currentResetTimeout = setTimeout(() => resetForm(this, preventResetFields), resetTimeout);
    } else {
      resetForm(this, preventResetFields);
    }
  }

  /**
   * Redirects the user to the defined URL.
   */
  public handleRedirect() {
    const { redirectUrl, redirectTimeout, redirectToNewTab, currentRedirectTimeout } = this;

    if (!redirectUrl) return;

    clearTimeout(currentRedirectTimeout);
    this.currentRedirectTimeout = undefined;

    if (redirectTimeout) {
      this.currentRedirectTimeout = setTimeout(() => redirectUser(redirectUrl, redirectToNewTab), redirectTimeout);
    } else {
      redirectUser(redirectUrl, redirectToNewTab);
    }
  }

  /**
   * Reload the page.
   */
  public handleReload() {
    const { reloadTimeout, currentReloadTimeout } = this;
    const { location } = window;

    clearTimeout(currentReloadTimeout);
    this.currentReloadTimeout = undefined;

    if (reloadTimeout) {
      this.currentReloadTimeout = setTimeout(location.reload, reloadTimeout);
    } else {
      location.reload();
    }
  }

  /**
   * Submits the form data to a custom URL using the defined action and method in the form.
   * @returns A boolean Promise. `true` if it was successful.
   */
  public async handleEnhancedSubmit(): Promise<boolean> {
    const { form } = this;
    const { action, method } = form;

    if (!action) return false;

    hideFormError(this);

    const resetSubmitText = displayFormSubmitWaitText(this);

    const success = await enhancedSubmit(form, action, method);

    if (success) showFormSuccess(this);
    else showFormError(this);

    resetSubmitText();

    return success;
  }

  /**
   * Triggers all the `ix-trigger` interactions.
   */
  public triggerIx() {
    for (const ixTrigger of this.ixTriggers) simulateEvent(ixTrigger, 'click');
  }
}
