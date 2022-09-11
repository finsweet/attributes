import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element AppliedTo Errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-dom-not-found.html`;

test('Element - DOM from applied to not found', async (t) => {
  await selectAttribute('CMS Load');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);
  await assertErrorIsOnReport('element-list', 'element-not-found');
  await assertErrorIsOnAttribute('element-list', 'element-not-found');

  await writeFileValidationMessage('Required element not found', 'element-list');
});
