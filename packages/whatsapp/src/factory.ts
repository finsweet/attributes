import { formatPhoneNumber, formatUrl, getAttribute, getInstanceIndex, queryElement, WHATSAPP_BASE_URL } from './utils';

/**
 * Initialize a WhatsApp button element instance
 * @param buttonElement  The button element to initialize
 * @returns  The initialized button element
 */
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

  // format phone number and url
  phone = formatPhoneNumber(phone);
  const url = formatUrl(`${WHATSAPP_BASE_URL}/${phone}`, { text: message.trim() });

  buttonElement.setAttribute('href', url);
  buttonElement.setAttribute('target', '_blank');
};
