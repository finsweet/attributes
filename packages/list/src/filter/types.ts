import type { SETTINGS } from '../utils/constants';

type FilterOperatorValues = (typeof SETTINGS)['operator']['values'];
export type FilterOperator = FilterOperatorValues[keyof FilterOperatorValues];

export type FilterMatch = 'and' | 'or';

// export type FilterData = {
//   fieldKeys: string[] | null;
//   op: FilterOperator;
// } & (
//   | {
//       type: 'multiple';
//       value: string[];
//     }
//   | {
//       type: 'number';
//       value: number | null;
//     }
//   | {
//       type: 'checkbox';
//       value: string | null;
//     }
//   | {
//       type: 'text';
//       value: string;
//     }
//   | {
//       type: 'radio';
//       value: string | null;
//     }
//   | {
//       type: 'date';
//       value: Date | null;
//     }
// );

// export type FiltersData = {
//   [key: string]: FilterData;
// };

export type FiltersCondition = {
  field?: string;
  op?: FilterOperator;
  value?: string | string[];
  match?: FilterMatch;
  fuzzy?: number;
};

export type FiltersGroup = {
  match?: FilterMatch;
  conditions: FiltersCondition[];
};

export type Filters = {
  match?: FilterMatch;
  groups: FiltersGroup[];
};
