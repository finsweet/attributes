<script lang="ts">
  import Attribute from '@src/components/Attributes/Attribute.svelte';
  import AttributeItem from '@src/components/Attributes/AttributeItem.svelte';
  import AttributeKey from '@src/components/Attributes/AttributeKey.svelte';
  import AttributeItemHeader from '@src/components/Attributes/AttributeItemHeader.svelte';
  import AttributeCheckbox from '@src/components/Attributes/AttributeCheckbox.svelte';
  import AttributeItemContainer from '@src/components/Attributes/AttributeItemContainer.svelte';
  import AttributeContainer from '@src/components/Attributes/AttributeContainer.svelte';
  import AttributeLabel from '@src/components/Attributes/AttributeLabel.svelte';
  import AttributeText from '@src/components/Attributes/AttributeText.svelte';
  import AttributeToggle from '@src/components/Attributes/AttributeToggle.svelte';
  import AttributeRequired from '@src/components/Attributes/AttributeRequired.svelte';
  import AttributeSelector from '@src/components/Attributes/Selector/Selector.svelte';
  import FieldSpecialization from '@src/components/Field/Specialization/FieldSpecialization.svelte';
  import FieldSettings from '@src/components/Schema/FieldSetting.svelte';
  import InputValidation from '@src/components/Report/ReportAttribute.svelte';
  import FieldHeader from '@src/components/Field/FieldHeader.svelte';
  import FieldWrapper from '@src/components/Field/FieldWrapper.svelte';
  import type { FieldUI } from '@src/types/Schema.types';
  import type {
    SchemaInputField,
    FieldChangeSpecialization,
    FieldChangeIdentifier,
    SchemaInputValidation,
  } from '@src/types/Input.types';

  import { schemaFormActions, schemaForm, toggleAttributeSelector } from '@src/stores';

  export let addField: (event: Event) => void;
  export let deleteField: (fieldIndex: string) => void;
  export let toggleFields: (fieldIndex: string | null) => void;
  export let selectedField: string | null;
  export let field: FieldUI;
  export let fieldInput: SchemaInputField;

  export let changeFieldIdentifier: FieldChangeSpecialization;
  export let changeFieldElement: FieldChangeIdentifier;

  let hasSettings = field?.settings?.length > 0 || false;

  let isOpen = selectedField === fieldInput.index;

  let isChecked = true;
  let isRequired = true;

  let fieldStatus: boolean | null = getInputStatus(fieldInput?.validation);

  let selectorId = `field-${field.key}-${fieldInput.index}`;
  let isOpenSelector = $toggleAttributeSelector === selectorId;

  function toggleSelector() {
    if (!isOpenSelector) {
      $toggleAttributeSelector = selectorId;
      return;
    }

    $toggleAttributeSelector = null;
    isOpenSelector = false;
  }

  function getInputStatus(validation: SchemaInputValidation | null | undefined): boolean | null {
    if (validation === null || validation === undefined) {
      return null;
    }

    return validation.status;
  }

  $: if ($schemaForm) {
    fieldInput = schemaFormActions.findField(field.key, fieldInput.index);
    fieldStatus = getInputStatus(fieldInput?.validation);
  }

  $: if ($toggleAttributeSelector) {
    isOpenSelector = $toggleAttributeSelector === selectorId;
  }

  $: {
    if (fieldInput) {
      isOpen = selectedField === fieldInput.index;
    }
  }
</script>

<Attribute>
  <FieldHeader {toggleFields} {addField} {deleteField} {fieldInput} {isOpen} />
  <FieldWrapper isOpen={selectedField === fieldInput.index}>
    <AttributeItem id={selectorId} checked={isChecked} status={fieldStatus}>
      <AttributeItemHeader>
        <AttributeCheckbox onCheck={null} {isChecked} {isRequired} key={field.key} status={fieldStatus} />
        <AttributeItemContainer>
          <AttributeContainer>
            <AttributeLabel {toggleSelector}>
              <AttributeKey>
                {field.key}
              </AttributeKey>
              <AttributeText>
                {field.description}
                {#if fieldInput && fieldInput.index === 'field-1'}
                  <AttributeRequired />
                {/if}
              </AttributeText>
            </AttributeLabel>
            <AttributeToggle isOpen={isOpenSelector} {toggleSelector} />
          </AttributeContainer>
          {#if isOpenSelector}
            <AttributeSelector
              type="field"
              key={field.key}
              value={fieldInput.identifier}
              specialization={fieldInput.specialization}
            />
          {/if}
        </AttributeItemContainer>
      </AttributeItemHeader>
      {#if fieldInput && fieldInput.validation}
        {#each fieldInput.validation.messages as inputMessage}
          <InputValidation
            status={fieldInput.validation.status}
            message={inputMessage.message}
            type={inputMessage.type}
          />
        {/each}
      {/if}
      <FieldSpecialization
        specializations={field.specializations}
        {changeFieldElement}
        {changeFieldIdentifier}
        fieldIndex={fieldInput}
      />
    </AttributeItem>
    {#if hasSettings}
      {#each field.settings as setting}
        <FieldSettings
          fieldKey={field.key}
          fieldIndex={fieldInput.index}
          {setting}
          identifier={fieldInput.identifier}
        />
      {/each}
    {/if}
  </FieldWrapper>
</Attribute>
