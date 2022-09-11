import { selectAttribute, clickRunCheck, typeFieldIdentifier, selectFieldSpecialization } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Field - Link`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/field-link-collection-item-not-found.html`;

test('Field Link - Find the referencial page but no collection item', async (t) => {
  await selectAttribute('CMS Nest');

  await typeFieldIdentifier('field-collection-field-1', 'attraction-categories');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('field-collection-field-1', 'field-link-nested-collection-not-found');
  await assertErrorIsOnAttribute('field-collection-field-1', 'field-link-nested-collection-not-found');

  await writeFileValidationMessage(
    'Collection List reference on Collection Template not found - CMS Nest',
    'field-collection-field-1'
  );
});
