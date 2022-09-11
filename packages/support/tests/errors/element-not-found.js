import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element not found errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-not-found.html`;

test('Element not found in page', async (t) => {
  await selectAttribute('CMS Load');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);
  await assertErrorIsOnReport('element-list', 'attribute-not-found');
  await assertErrorIsOnAttribute('element-list', 'attribute-not-found');

  await writeFileValidationMessage('Element attribute not found', 'element-list');
});
