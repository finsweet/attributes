import { selectAttribute, clickRunCheck, typeFieldIdentifier } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Field - Input`.page`http://localhost:3000/packages/support/public/scenarios/errors/field-input.html`;

test('Field missing identifier error', async (t) => {
  await selectAttribute('CMS Filter');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('field-field-field-1', 'field-identifier');
  await assertErrorIsOnAttribute('field-field-field-1', 'field-identifier');

  await writeFileValidationMessage('Field identifier not entered', 'field-field-field-1');
});

test('Field missing specialization error', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'products');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('field-field-field-1', 'field-specialization');
  await assertErrorIsOnAttribute('field-field-field-1', 'field-specialization');

  await writeFileValidationMessage('Field element type not entered', 'field-field-field-1');
});
