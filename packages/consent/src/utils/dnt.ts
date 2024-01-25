/**
 * Returns true or false based on whether doNotTack is enabled. It also takes into account the
 * anomalies, such as !bugzilla 887703, which effect versions of Fx 31 and lower. It also handles
 * IE versions on Windows 7, 8 and 8.1, where the DNT implementation does not honor the spec.
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1217896 for more details
 * @see https://schalkneethling.medium.com/respect-user-choice-do-not-track-6c13b805b256 for full article on the topic and solution used here
 * @returns {boolean} `true` if DNT is enabled else `false`
 */
export const hasEnabledDNT = (): boolean => {
  // for old version of IE we need to use the msDoNotTrack property of navigator
  // on newer versions, and newer platforms, this is doNotTrack but, on the window object
  // Safari also exposes the property on the window object.
  let dntStatus = navigator.doNotTrack || window.doNotTrack;
  const ua = navigator.userAgent;

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
