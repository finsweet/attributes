interface CustomNavigator extends Navigator {
  // Old IE support: https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/gg699492(v=vs.85)#remarks
  msDoNotTrack?: string | null;
}

/**
 * Checks if the user has enabled the "Do Not Track" (DNT) preference.
 * @returns {boolean} Returns `true` if the user prefers not to be tracked, or `false` if they allow tracking
 */
export const hasEnabledDNT = (): boolean => {
  const customNavigator: CustomNavigator = navigator;
  //solution ref: https://www.cogmentis.com/how-to-properly-check-for-do-not-track-with-javascript/

  const dnt =
    typeof customNavigator.doNotTrack !== 'undefined'
      ? customNavigator.doNotTrack
      : typeof window.doNotTrack !== 'undefined'
      ? window.doNotTrack
      : typeof customNavigator.msDoNotTrack !== 'undefined'
      ? customNavigator.msDoNotTrack
      : null;

  if (!dnt) return false;

  const dntValue = parseInt(dnt, 10);

  if (dntValue === 1 || dnt === 'yes') {
    // The user prefers NOT TO BE TRACKED on this request
    return true;
  }

  // The user prefers to ALLOW TRACKING on this request
  return false;
};
