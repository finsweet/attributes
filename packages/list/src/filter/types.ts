export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'includes'
  | 'nincludes'
  | 'exists'
  | 'nexists';

export type FilterData = {
  op: FilterOperator;
} & (
  | {
      type: 'multiple';
      value: string[];
    }
  | {
      type: 'number';
      value: number | null;
    }
  | {
      type: 'checkbox';
      value: string | null;
    }
  | {
      type: 'text';
      value: string;
    }
  | {
      type: 'radio';
      value: string | null;
    }
  | {
      type: 'date';
      value: Date | null;
    }
);

export type FiltersData = {
  [key: string]: FilterData;
};

export type FiltersGroup = {
  match: 'and' | 'or';
  filters: FiltersData;
};
