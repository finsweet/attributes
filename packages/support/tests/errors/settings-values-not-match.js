import { selectAttribute, clickRunCheck, selectItem } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Setting values not match errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/setting-values-not-match-value.html`;

test('Setting - values not match error', async (t) => {
  await selectAttribute('Form Submit Actions');

  await selectItem('setting-preventreset');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('setting-preventreset', 'setting-value-not-match');
  await assertErrorIsOnAttribute('setting-preventreset', 'setting-value-not-match');

  await writeFileValidationMessage('Option attribute not match value', 'setting-preventreset');
});
