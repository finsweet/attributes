import { SETTINGS } from '../../utils/constants';
import type { FilterMatch, FilterOperator } from '../types';

const FIELD_REGEX = /\[field=(?:"([^"]*)"|([^\]]+))\]/;
const OPERATOR_REGEX = new RegExp(`^(${SETTINGS.operator.values.join('|')})`);
const FIELD_MATCH_VALUES = SETTINGS.fieldmatch.values.join('|');
const FIELD_MATCH_REGEX = new RegExp(`\\[fieldmatch=(${FIELD_MATCH_VALUES}|"(${FIELD_MATCH_VALUES})")\\]`);

/**
 * @returns The filter match value of a given select element.
 * @param selectElement
 */
export const getFilterMatchValue = (selectElement: HTMLSelectElement): FilterMatch =>
  selectElement.value === 'or' ? 'or' : 'and';

/**
 * Parses the operator and field match value from a condition operator selection.
 * @param value
 * @returns The operator, field key, field match, and filter match, if found.
 */
export const parseOperatorValue = (
  value: string
): { op?: FilterOperator; fieldKey?: string; fieldMatch?: FilterMatch } => {
  let op: FilterOperator | undefined;
  let fieldKey: string | undefined;
  let fieldMatch: FilterMatch | undefined;

  const opMatch = value.match(OPERATOR_REGEX);
  if (opMatch) {
    op = opMatch[1] as FilterOperator;
  }

  const fieldKeyMatch = value.match(FIELD_REGEX);
  if (fieldKeyMatch) {
    fieldKey = fieldKeyMatch[1] || fieldKeyMatch[2];
  }

  const fieldMatchMatch = value.match(FIELD_MATCH_REGEX);
  if (fieldMatchMatch) {
    fieldMatch = (fieldMatchMatch[2] || fieldMatchMatch[1]) as FilterMatch;
  }

  return { op, fieldKey, fieldMatch };
};
