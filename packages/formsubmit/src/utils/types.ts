import type { FormField } from '@finsweet/ts-utils';

export interface FieldData {
  element: FormField;
  value: string;
  checked?: boolean;
}
