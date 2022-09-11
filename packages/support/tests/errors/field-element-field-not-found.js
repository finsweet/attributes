import { selectAttribute, clickRunCheck, typeFieldIdentifier } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Field Element - Field - Not found errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/field-element-field-not-found.html`;

test('Field Element - Field - Not found', async (t) => {
  await selectAttribute('CMS Attribute');

  await typeFieldIdentifier('field-field-field-1', 'products');

  await clickRunCheck();

  await assertErrorsCountOnReport(2);

  await assertErrorIsOnReport('field-field-field-1', 'field-element-not-found', 1);
  await assertErrorIsOnAttribute('field-field-field-1', 'field-element-not-found', 1);

  await writeFileValidationMessage('Field element type not entered', 'field-field-field-1');
});
