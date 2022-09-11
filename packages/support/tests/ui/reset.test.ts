import { selectAttribute, clickRunCheck, typeFieldIdentifier, clickReset } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Reset`.page`http://localhost:3000/packages/support/public/scenarios/ui/reset.html`;

test('Reset should keep identifier type when using default', async (t) => {
  await selectAttribute('CMS Attribute');

  await typeFieldIdentifier('field-field-field-1', 'categories');

  await clickRunCheck();

  await clickReset();

  await typeFieldIdentifier('field-field-field-1', 'categories');

  await clickRunCheck();

  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
