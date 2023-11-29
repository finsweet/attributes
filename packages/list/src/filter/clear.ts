import { clearFormField } from '@finsweet/attributes-utils';

import { type ResetData } from './types';

export const clearFilterData = (formFields: HTMLInputElement[], resetData: ResetData) => {
  let elementsToClear: HTMLInputElement[];
  if (resetData.rawFilterKey) {
    elementsToClear = resetData.inputFields;
  } else {
    elementsToClear = formFields;
  }

  for (const element of elementsToClear) clearFormField(element);
};
