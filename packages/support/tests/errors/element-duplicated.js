import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element duplicated errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-duplicated.html`;

test('Element with required instance is duplicated', async (t) => {
  await selectAttribute('CMS Load');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);
  await assertErrorIsOnReport('element-list', 'attribute-duplicated');
  await assertErrorIsOnAttribute('element-list', 'attribute-duplicated');

  await writeFileValidationMessage('Attribute element duplicated', 'element-list');
});
