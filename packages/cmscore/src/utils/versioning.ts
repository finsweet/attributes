/**
 * Checks if the target version matches the operator.
 *
 * @example
 * ```
 * const coreVersion = 2.5.3;
 *
 * checkCMSCoreVersion('>=', '2.5.1') // true
 * checkCMSCoreVersion('>=', '2.5.5') // false
 * checkCMSCoreVersion('<=', '2.5.4') // true
 * checkCMSCoreVersion('>=', '2.5.3') // true
 * ```
 *
 * @param operator The desired comparison operator.
 * @param targetVersion The target version to compare.
 * @returns `true` when the comparison is valid.
 */
export const checkCMSCoreVersion = (operator: '>=' | '<=', targetVersion: string): boolean => {
  const { coreVersion } = window.fsAttributes.cms;
  if (!coreVersion) return false;

  const collatorOptions: Intl.CollatorOptions = {
    numeric: true,
    sensitivity: 'base',
  };

  const result = targetVersion.localeCompare(coreVersion, undefined, collatorOptions);

  return result === 0 || (operator === '>=' ? result < 0 : result > 0);
};
