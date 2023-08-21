import { WHATSAPP_BASE_URL } from './utils/constants';
import { formatUrl } from './utils/helpers';
import { getAttribute, getInstanceIndex, queryElement } from './utils/selectors';

export const initWhatsappInstance = (buttonElement: Element) => {
  // static
  let phone = getAttribute(buttonElement, 'phone');
  let message = getAttribute(buttonElement, 'message');

  // dynamic
  if (!message && !phone) {
    const instanceIndex = getInstanceIndex(buttonElement);
    // phone
    phone = queryElement('phone', { instanceIndex, scope: buttonElement })?.textContent ?? '';
    // message
    message = queryElement('message', { instanceIndex, scope: buttonElement })?.textContent ?? '';
  }

  if (!phone || !message) return; //todo: throw new Error('Missing phone or message attribute');

  buttonElement.setAttribute('href', formatUrl(`${WHATSAPP_BASE_URL}/${phone}`, { text: message }));
  buttonElement.setAttribute('target', '_blank');
};
