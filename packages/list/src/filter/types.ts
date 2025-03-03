import type { FormFieldType } from '@finsweet/attributes-utils';

import type { ListItem } from '../components';
import type { SETTINGS } from '../utils/constants';

type FilterOperatorValues = (typeof SETTINGS)['operator']['values'];
export type FilterOperator = FilterOperatorValues[number];

export type FilterMatch = 'and' | 'or';

export type FiltersCondition = {
  field: string;
  op: FilterOperator;
  type: FormFieldType;
  value?: string | string[];
  filterMatch: FilterMatch;
  fieldMatch: FilterMatch;
  fuzzy?: number;
};

export type FiltersGroup = {
  conditionsMatch: FilterMatch;
  conditions: FiltersCondition[];
};

export type Filters = {
  groupsMatch: FilterMatch;
  groups: FiltersGroup[];
};

export type PickedListItem = Pick<ListItem, 'id' | 'fields'>;

export type FilterRequestMessage = { id: number; filters: Filters; items: PickedListItem[] };
export type FilterResponseMessage = { id: number; filteredItems: PickedListItem[] };
