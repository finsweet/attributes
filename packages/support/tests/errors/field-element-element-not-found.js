import { selectAttribute, clickRunCheck, typeFieldIdentifier } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Field Element - Element - Not found errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/field-element-element-not-found.html`;

test('Field Element - Element - Not found', async (t) => {
  await selectAttribute('CMS Attribute');

  await typeFieldIdentifier('field-field-field-1', 'products');

  await clickRunCheck();

  await assertErrorsCountOnReport(2);

  await assertErrorIsOnReport('field-element-field-field-1-name', 'attribute-not-found', 1);
  await assertErrorIsOnAttribute('field-element-field-field-1-name', 'attribute-not-found', 1);

  await writeFileValidationMessage('Field element type not entered', 'field-element-field-field-1-name');
});
