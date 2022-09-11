import { selectAttribute, clickRunCheck, typeFieldIdentifier, selectFieldSpecialization } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Field - Not found`.page`http://localhost:3000/packages/support/public/scenarios/errors/field-not-found.html`;

test('Field missing one specialization applied to', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('field-field-field-1', 'field-not-found', 1);
  await assertErrorIsOnAttribute('field-field-field-1', 'field-not-found', 1);
});

test('Field missing more than one specialization applied to', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'categories');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await clickRunCheck();

  await assertErrorsCountOnReport(2);

  await assertErrorIsOnReport('field-field-field-1', 'field-not-found', 1);
  await assertErrorIsOnAttribute('field-field-field-1', 'field-not-found', 1);
  await assertErrorIsOnReport('field-field-field-1', 'field-not-found', 2);
  await assertErrorIsOnAttribute('field-field-field-1', 'field-not-found', 2);

  await writeFileValidationMessage('Required field attribute in Collection List not found', 'field-field-field-1', 1);
  await writeFileValidationMessage('Required field attribute in Filter UI not found', 'field-field-field-1', 2);
});
