import { selectAttribute, clickRunCheck, typeFieldIdentifier } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Nest`.page`http://localhost:3000/packages/support/public/scenarios/cms-nest/scenario-1.html`;

test('CMS Nest - Validate instance 0-1', async (t) => {
  await selectAttribute('CMS Nest');
  await typeFieldIdentifier('field-collection-field-1', 'categories');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
