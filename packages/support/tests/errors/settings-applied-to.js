import { selectAttribute, clickRunCheck, selectItem } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Setting applied to`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/setting-applied-to.html`;

test('Setting - applied to', async (t) => {
  // not applicable yet
  await selectAttribute('Form Submit Actions');

  // await selectItem('setting-preventreset');

  // await clickRunCheck();

  // await assertErrorsCountOnReport(1);

  // await assertErrorIsOnReport('setting-preventreset', 'attribute-applied');
  // await assertErrorIsOnAttribute('setting-preventreset', 'attribute-applied');

  // await writeFileValidationMessage('Option attribute not applied to correct element', 'setting-preventreset');
});
