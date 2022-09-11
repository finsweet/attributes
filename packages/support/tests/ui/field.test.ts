import {
  selectAttribute,
  clickRunCheck,
  typeFieldIdentifier,
  clickReset,
  addField,
  deleteField,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Field`.page`http://localhost:3000/packages/support/public/scenarios/ui/fields.html`;

test('Delete field with elements', async (t) => {
  await selectAttribute('CMS Attribute');

  await typeFieldIdentifier('field-field-field-1', 'products');

  await addField();

  await typeFieldIdentifier('field-field-field-2', 'category');

  await clickRunCheck();

  await deleteField('field-field-field-2');

  await clickRunCheck();

  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
