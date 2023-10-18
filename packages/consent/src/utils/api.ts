import { Debug } from '../components';
import type { Action, Consents } from '../utils';

/**
 * Post the consents to the provided endpoint
 * @param params
 */
export const POSTConsentsToEndpoint = async ({
  id,
  endpoint,
  consents,
  action,
  bannerText,
}: {
  id: string;
  endpoint: string;
  consents: Consents;
  action: Action;
  bannerText: string;
}): Promise<void> => {
  if (!endpoint) return;

  try {
    const body = JSON.stringify({
      id,
      action,
      consents,
      bannerText,
      url: window.location.href,
      userAgent: navigator.userAgent,
    });

    const response = await fetch(endpoint, {
      body,
      method: 'POST',
    });

    if (response.ok) Debug.alert('The new consents were successfully POSTed to the API endpoint.', 'info');
    else throw new Error(`The API returned a ${response.status} status.`);
  } catch (error) {
    Debug.alert(`There was an error while POSTing to the API: ${error}`, 'error');
  }
};
