import { selectAttribute, clickRunCheck, selectItem } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Setting conditions is child of`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/setting-condition-child-of.html`;

test('Setting - conditions is child of', async (t) => {
  await selectAttribute('Form Submit Actions');

  await selectItem('setting-preventreset');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('setting-preventreset', 'conditions-isChildOf');
  await assertErrorIsOnAttribute('setting-preventreset', 'conditions-isChildOf');

  await writeFileValidationMessage('Option attribute not child of', 'setting-preventreset');
});
