<script lang="ts">
  import Field from '@src/components/Schema/Field.svelte';
  import type { FieldUI } from '@src/types/Schema.types';
  import { scrollInto } from '@src/services/DOM/Utils/Utils';
  import { schemaFormActions, schemaSettingsInstance } from '@src/stores';
  import type { SchemaInputField } from '@src/types/Input.types';

  export let field: FieldUI;

  let fields: SchemaInputField[] = schemaFormActions.getFields();
  let selectedField: string | null = null;

  if (fields.length === 0) {
    addField(null);
  }

  function addField(event: Event | null) {
    if (event) {
      event.stopPropagation();
    }
    const lastIndex = schemaFormActions.addField(field.key);
    selectedField = lastIndex;

    if (field.specializations.length === 1) {
      schemaFormActions.setFieldSpecialization(field.key, lastIndex, field.specializations[0].key);
    }

    fields = schemaFormActions.getFields();

    if (fields.length > 1) {
      scrollInto('div.fields > .attribute:last-child', 200);
    }
  }

  function deleteField(fieldIndex: string) {
    schemaFormActions.deleteField(field.key, fieldIndex);
    schemaFormActions.disableFieldSettings(field.key, fieldIndex);
    fields = schemaFormActions.getFields();

    if (selectedField === fieldIndex) {
      scrollInto('div.fields > .attribute:first-child', 200);
    }
  }

  function changeFieldElement(fieldIndex: string, value: string) {
    schemaFormActions.setFieldSpecialization(field.key, fieldIndex, value);
    fields = schemaFormActions.getFields();
  }

  function changeFieldIdentifier(fieldIndex: string, value: string) {
    schemaFormActions.setFieldValue(field.key, fieldIndex, value);
  }

  function toggleFields(toggleIndex: string | null) {
    selectedField = toggleIndex;
  }

  $: {
    fields = schemaFormActions.getFields();
  }

  $: if ($schemaSettingsInstance) {
    fields = schemaFormActions.getFields();
    if (fields.length === 0) {
      addField(null);
    }
  }
</script>

{#each fields as fieldInput (fieldInput)}
  <Field
    {toggleFields}
    {selectedField}
    {addField}
    {deleteField}
    {field}
    {fieldInput}
    {changeFieldElement}
    {changeFieldIdentifier}
  />
{/each}
