interface CustomNavigator extends Navigator {
  // Old IE support: https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/gg699492(v=vs.85)#remarks
  msDoNotTrack?: string | null;
}

/**
 * Checks if the user has enabled the "Do Not Track" (DNT) preference.
 * @returns {boolean} Returns `true` if the user prefers not to be tracked, or `false` if they allow tracking
 */
export const hasEnabledDNT = (): boolean => {
  'use strict';

  const customNavigator: CustomNavigator = navigator;
  //solution ref: https://schalkneethling.medium.com/respect-user-choice-do-not-track-6c13b805b256

  /**
   * Returns true or false based on whether doNotTack is enabled. It also takes into account the
   * anomalies, such as !bugzilla 887703, which effect versions of Fx 31 and lower. It also handles
   * IE versions on Windows 7, 8 and 8.1, where the DNT implementation does not honor the spec.
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1217896 for more details
   * @params {string} [dnt] - An optional mock doNotTrack string to ease unit testing.
   * @params {string} [userAgent] - An optional mock userAgent string to ease unit testing.
   * @returns {boolean} true if enabled else false
   */

  // for old version of IE we need to use the msDoNotTrack property of navigator
  // on newer versions, and newer platforms, this is doNotTrack but, on the window object
  // Safari also exposes the property on the window object.
  let dntStatus = customNavigator.doNotTrack || window.doNotTrack || customNavigator.msDoNotTrack;
  const ua = customNavigator.userAgent;

  // List of Windows versions known to not implement DNT according to the standard.
  const anomalousWinVersions = ['Windows NT 6.1', 'Windows NT 6.2', 'Windows NT 6.3'];

  const fxMatch = ua.match(/Firefox\/(\d+)/);
  const ieRegEx = /MSIE|Trident/i;
  const isIE = ieRegEx.test(ua);
  // Matches from Windows up to the first occurance of ; un-greedily
  // http://www.regexr.com/3c2el
  const platform = ua.match(/Windows.+?(?=;)/g);

  // With old versions of IE, DNT did not exist so we simply return false;
  if (isIE && typeof Array.prototype.indexOf !== 'function') {
    return false;
  }

  if (fxMatch && parseInt(fxMatch[1], 10) < 32) {
    // Can't say for sure if it is 1 or 0, due to Fx bug 887703
    dntStatus = 'Unspecified';
  } else if (isIE && platform && anomalousWinVersions.indexOf(platform.toString()) !== -1) {
    // default is on, which does not honor the specification
    dntStatus = 'Unspecified';
  } else {
    // sets dntStatus to Disabled or Enabled based on the value returned by the browser.
    // If dntStatus is undefined, it will be set to Unspecified
    if (!dntStatus) {
      dntStatus = 'Unspecified';
    }

    dntStatus = { '0': 'Disabled', '1': 'Enabled' }[dntStatus] || 'Unspecified';
  }

  return dntStatus === 'Enabled' ? true : false;
};
