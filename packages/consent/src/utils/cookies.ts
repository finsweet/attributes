import Cookies from 'js-cookie';

import { COOKIE_KEYS } from './constants';
import { isValidConsents } from './type-guards';
import type { ConsentMode, Consents, ConsentsCookie } from './types';

/**
 * @returns The proper domain to store the cookies,
 * considering that the website might be in staging mode under webflow.io.
 *
 * @param domain
 */
export const processConsentsCookieDomain = (domain?: string | null) => {
  if (!domain) return;

  const { hostname } = window.location;

  if (hostname.includes('webflow.io')) {
    return hostname;
  }

  return domain;
};

/**
 * Get the stored consents from the cookie
 * @returns The Consents, if existing
 */
export const getConsentsCookie = (): Partial<Consents> | undefined => {
  const storedConsents = Cookies.get(COOKIE_KEYS.main);
  if (!storedConsents) return;

  const parsedConsents = JSON.parse(decodeURIComponent(storedConsents)) as ConsentsCookie;
  if (parsedConsents.consents && isValidConsents(parsedConsents.consents)) return parsedConsents.consents;
};

/**
 * Store the consents in a cookie
 * @param consents
 */
export const setConsentsCookie = (id: string, consents: Consents, expires = 120, domain?: string | null): void => {
  const consentsCookie: ConsentsCookie = { id, consents };
  const cookieValue = encodeURIComponent(JSON.stringify(consentsCookie));

  domain = processConsentsCookieDomain(domain);

  // Cookies without the “SameSite” attribute or with an invalid value will be treated as “Lax”.
  // This means that the cookie will no longer be sent in third-party contexts.
  // Applications that depends on this cookie being available in such contexts needs to have “SameSite=None“.
  // Ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
  Cookies.set(COOKIE_KEYS.main, cookieValue, { expires, domain, sameSite: 'None', secure: true });
};

/**
 * Delete all cookies. Tries to delete them with all possible domain combinations
 */
export const removeAllCookies = (): void => {
  const cookies = Cookies.get();

  for (const cookie in cookies) {
    // skip removing the main fs-consent cookie and the fs-consent-[CONSENT_MODE] cookies
    if (cookie.includes(COOKIE_KEYS.main)) continue;

    const splitDomain = window.location.host.split('.');
    while (splitDomain.length > 1) {
      Cookies.remove(cookie);
      Cookies.remove(cookie, { domain: `.${splitDomain.join('.')}` });
      Cookies.remove(cookie, { domain: `${splitDomain.join('.')}` });
      splitDomain.splice(0, 1);
    }
  }
};

/**
 * Get the updated state
 * @returns True if the cookie exists
 */
export const getUpdatedStateCookie = (): boolean => !!Cookies.get(COOKIE_KEYS.consentsUpdated);

/**
 * Set/Remove the updated state to the cookies storage
 * @param state
 */
export const setUpdatedStateCookie = (expires = 120, domain?: string | null): void => {
  domain = processConsentsCookieDomain(domain);

  Cookies.set(COOKIE_KEYS.consentsUpdated, 'true', { expires, domain, sameSite: 'None', secure: true });
};

/**
 * Set or update the fs-consent-[CONSENT_MODE] consent cookie.
 * @param consents
 * @param expires
 * @param domain
 */
export const setConsentModeCookies = (consents: ConsentMode, expires = 120, domain?: string | null): void => {
  domain = processConsentsCookieDomain(domain);

  for (const consent in consents) {
    const key = consent as keyof ConsentMode;
    const cookieName = `${COOKIE_KEYS.main}-${consent}`;

    Cookies.set(cookieName, String(consents[key] === 'granted'), { expires, domain });
  }
};
