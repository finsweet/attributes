import { FORM_CSS_CLASSES } from '@finsweet/ts-utils';
import type { FormBlockElement } from '@finsweet/ts-utils';
import { getInstanceIndex } from 'global/helpers';

import { Form } from './components/Form';
import { parseActionAttribute } from './utils/attributes';
import { ATTRIBUTES, queryElement } from './utils/constants';

/**
 * Creates a new formsubmit instance.
 * @param formElement
 */
export const initFormInstance = (formElement: Element) => {
  const formBlock = formElement.closest<FormBlockElement>(`.${FORM_CSS_CLASSES.formBlock}`);
  if (!formBlock) return;

  const form = formBlock.querySelector('form');
  if (!form) return;

  const instanceIndex = getInstanceIndex(formElement, ATTRIBUTES.element.key);
  const ixTriggers = queryElement('ixTrigger', { instanceIndex, all: true });
  const resetButtons = queryElement('reset', { instanceIndex, all: true });

  // Reset
  const rawReset = formElement.getAttribute(ATTRIBUTES.reset.key);
  const [reset, resetTimeout] = parseActionAttribute(rawReset);

  // Reload
  const rawReload = formElement.getAttribute(ATTRIBUTES.reload.key);
  const [reload, reloadTimeout] = parseActionAttribute(rawReload);

  // Redirect
  const rawRedirect = formElement.getAttribute(ATTRIBUTES.redirect.key);
  const [redirect, redirectTimeout] = parseActionAttribute(rawRedirect);
  const redirectUrl = formElement.getAttribute(ATTRIBUTES.redirectUrl.key);
  const redirectToNewTab =
    formElement.getAttribute(ATTRIBUTES.redirectTarget.key) === ATTRIBUTES.redirectTarget.values.newTab;

  // Enhance
  const enhance = formElement.getAttribute(ATTRIBUTES.enhance.key) === ATTRIBUTES.enhance.values.true;

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
    ixTriggers,
    resetButtons,
  });

  return formInstance;
};
