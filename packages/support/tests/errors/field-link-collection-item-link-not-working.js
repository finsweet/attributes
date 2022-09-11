import { selectAttribute, clickRunCheck, typeFieldIdentifier, selectFieldSpecialization } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Field - Link`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/field-link-collection-item-link-not-working.html`;

test('Field Link - Find the referencial page, link but link not working', async (t) => {
  await selectAttribute('CMS Nest');

  await typeFieldIdentifier('field-collection-field-1', 'attraction-categories');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('field-collection-field-1', 'field-link-nested-collection-link-not-working');
  await assertErrorIsOnAttribute('field-collection-field-1', 'field-link-nested-collection-link-not-working');

  await writeFileValidationMessage('Link to Collection Item’s page not working - CMS Nest', 'field-collection-field-1');
});
