import { selectAttribute, selectItem, addField, clickRunCheck, typeFieldIdentifier } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Form Submit`.page`http://localhost:3000/packages/support/public/scenarios/query-param/scenario-1.html`;

test('Query Param - Default', async (t) => {
  await selectAttribute('Query Param');

  // add checkbox

  await typeFieldIdentifier('field-name-field-1', 'checkbox');

  await addField();

  await typeFieldIdentifier('field-name-field-2', 'radio');

  await selectItem('field-setting-name-field-2-removequery');

  // await clickToggleSelector('element-list-active');

  // add radio
  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
