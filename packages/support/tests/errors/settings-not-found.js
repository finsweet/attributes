import { selectAttribute, clickRunCheck, selectItem } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Setting not found errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/setting-not-found.html`;

test('Setting - not found in page', async (t) => {
  await selectAttribute('Form Submit Actions');

  await selectItem('setting-preventreset');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('setting-preventreset', 'attribute-not-found');
  await assertErrorIsOnAttribute('setting-preventreset', 'attribute-not-found');

  await writeFileValidationMessage('Option attribute not found', 'setting-preventreset');
});
