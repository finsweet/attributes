import { selectAttribute, addField, clickRunCheck, typeFieldIdentifier } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Attribute`.page`http://localhost:3000/packages/support/public/scenarios/cms-attribute/scenario-1.html`;

test('CMS Attribute - Default', async (t) => {
  await selectAttribute('CMS Attribute');

  // add checkbox
  await typeFieldIdentifier('field-field-field-1', 'categories');

  // add radio
  await addField();
  await typeFieldIdentifier('field-field-field-2', 'products');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
