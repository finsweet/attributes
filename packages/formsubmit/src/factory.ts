import { FORM_CSS_CLASSES, type FormBlockElement } from '@finsweet/attributes-utils';

import { Form } from './components/Form';
import { parseActionAttribute } from './utils/attributes';
import { getAttribute, getInstance, hasAttributeValue, queryAllElements } from './utils/selectors';

/**
 * Creates a new formsubmit instance.
 * @param formElement
 */
export const initFormInstance = (formElement: Element) => {
  const formBlock = formElement.closest<FormBlockElement>(`.${FORM_CSS_CLASSES.formBlock}`);
  if (!formBlock) return;

  const form = formBlock.querySelector('form');
  if (!form) return;

  const instance = getInstance(formElement);

  const ixTriggers = queryAllElements('ix-trigger', { instance });
  const resetButtons = queryAllElements('reset', { instance });

  // Reset
  const rawReset = getAttribute(formElement, 'reset');
  const [reset, resetTimeout] = parseActionAttribute(rawReset);

  // Reload
  const rawReload = getAttribute(formElement, 'reload');
  const [reload, reloadTimeout] = parseActionAttribute(rawReload);

  // Redirect
  const rawRedirect = getAttribute(formElement, 'redirect');
  const [redirect, redirectTimeout] = parseActionAttribute(rawRedirect);

  const redirectUrl = getAttribute(formElement, 'redirecturl');
  const redirectToNewTab = hasAttributeValue(formElement, 'redirectnewtab', 'true');

  // Disable
  const disable = hasAttributeValue(formElement, 'disable', 'true');

  // Enhance
  const enhance = hasAttributeValue(formElement, 'enhance', 'true');

  const formInstance = new Form({
    form,
    formBlock,
    reset,
    resetTimeout,
    reload,
    reloadTimeout,
    redirect,
    redirectUrl,
    redirectTimeout,
    redirectToNewTab,
    enhance,
    disable,
    ixTriggers,
    resetButtons,
  });

  return formInstance;
};
