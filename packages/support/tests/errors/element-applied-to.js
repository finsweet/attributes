import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element AppliedTo Errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-not-applied-to.html`;

test('Element not applied to correct element', async (t) => {
  await selectAttribute('CMS Load');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);
  await assertErrorIsOnReport('element-list', 'applied-to');
  await assertErrorIsOnAttribute('element-list', 'applied-to');

  await writeFileValidationMessage('Element attribute added to wrong element', 'element-list');
});
