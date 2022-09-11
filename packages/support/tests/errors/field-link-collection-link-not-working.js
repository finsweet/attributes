import { selectAttribute, clickRunCheck, typeFieldIdentifier, selectFieldSpecialization } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Field - Link`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/field-link-collection-link-not-working.html`;

test('Field Link - Find collection and link but not working', async (t) => {
  await selectAttribute('CMS Nest');

  await typeFieldIdentifier('field-collection-field-1', 'attraction-categories');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('field-collection-field-1', 'field-link-main-collection-link-not-working');
  await assertErrorIsOnAttribute('field-collection-field-1', 'field-link-main-collection-link-not-working');

  await writeFileValidationMessage('Link to Collection Item’s page not working', 'field-collection-field-1');
});
