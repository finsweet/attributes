import type { FormFieldType } from '@finsweet/attributes-utils';

import type { ListItem, ListItemFieldValue } from '../components';
import type { SETTINGS } from '../utils/constants';

type FilterOperatorValues = (typeof SETTINGS)['operator']['values'];
export type FilterOperator = FilterOperatorValues[number];

export type FilterMatch = 'and' | 'or';

export type FiltersCondition = {
  fieldKey: string;
  customTagField?: string;
  op: FilterOperator;
  type: FormFieldType;
  value: string | string[];
  filterMatch: FilterMatch;
  fieldMatch: FilterMatch;
  fuzzyThreshold?: number;
  interacted?: boolean;
};

export type FiltersGroup = {
  conditionsMatch: FilterMatch;
  conditions: FiltersCondition[];
};

export type Filters = {
  groupsMatch?: FilterMatch;
  groups: FiltersGroup[];
};

export type FilterTaskMatchedFields = {
  [fieldKey: string]: Array<{ fieldValue: ListItemFieldValue; filterValue: string }>;
};

export type FilterTaskItem = Pick<ListItem, 'id' | 'fields'> & { matchedFields: FilterTaskMatchedFields };

export type FilterTaskData = { filters: Filters; items: FilterTaskItem[] };
export type FilterTaskResult = FilterTaskItem[];
export type FilterTask = {
  data: FilterTaskData;
  resolve: (result: FilterTaskResult) => void;
  reject: (error: unknown) => void;
};
