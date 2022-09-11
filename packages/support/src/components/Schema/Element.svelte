<script lang="ts">
  import ElementSetting from '@src/components/Schema/ElementSetting.svelte';
  import Attribute from '@src/components/Attributes/Attribute.svelte';
  import AttributeItem from '@src/components/Attributes/AttributeItem.svelte';
  import AttributeKey from '@src/components/Attributes/AttributeKey.svelte';
  import AttributeItemHeader from '@src/components/Attributes/AttributeItemHeader.svelte';
  import AttributeCheckbox from '@src/components/Attributes/AttributeCheckbox.svelte';
  import AttributeItemContainer from '@src/components/Attributes/AttributeItemContainer.svelte';
  import AttributeContainer from '@src/components/Attributes/AttributeContainer.svelte';
  import AttributeLabel from '@src/components/Attributes/AttributeLabel.svelte';
  import AttributeText from '@src/components/Attributes/AttributeText.svelte';
  import AttributeRequired from '@src/components/Attributes/AttributeRequired.svelte';
  import AttributeToggle from '@src/components/Attributes/AttributeToggle.svelte';
  import AttributeSelector from '@src/components/Attributes/Selector/Selector.svelte';
  import InputValidation from '../Report/ReportAttribute.svelte';
  import { checkSettingCondition } from '@src/services/Attributes/Schema/SchemaService';
  import {
    schemaFormActions,
    schemaForm,
    schemaSettingsInstance,
    schemaSettingsKey,
    toggleAttributeSelector,
  } from '@src/stores';
  import type { ElementUI } from '@src/types/Schema.types';
  import type { SchemaInput, SchemaInputValidation } from '@src/types/Input.types';

  // attribute config
  export let element: ElementUI;
  let hasSettings = element?.settings?.length > 0 || false;
  let isRequired = element.required;

  // form config
  let elementInput: SchemaInput | null = schemaFormActions.findElement(element.key);
  let isEnable = true;
  let isChecked = !!elementInput;
  let elementStatus: boolean | null = getInputStatus(elementInput?.validation);

  if (isRequired && !isChecked) {
    isChecked = true;
    schemaFormActions.addElement(element.key);
  }

  function onCheck(event: Event): void {
    const input = event.target as HTMLInputElement;

    const { checked, value } = input;

    if (checked) {
      schemaFormActions.addElement(value);
      isChecked = true;
      return;
    }

    if (!isRequired) {
      schemaFormActions.deleteElement(value);
      schemaFormActions.disableElementSettings(value);
      isChecked = false;
    }
  }

  function checkIsEnable(schemaForm: SchemaInput[]) {
    const localEnable = checkSettingCondition(element, schemaForm, {
      instance: $schemaSettingsInstance,
      key: $schemaSettingsKey || '',
    });

    if (localEnable === false && isChecked === true) {
      schemaFormActions.deleteElement(element.key);
      isChecked = false;
    }

    if (isEnable !== localEnable) {
      isEnable = localEnable;
    }
  }

  // selector config
  let selectorId = `element-${element.key}`;
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

  $: {
    checkIsEnable($schemaForm);
    elementInput = schemaFormActions.findElement(element.key);
    elementStatus = getInputStatus(elementInput?.validation);
  }

  $: if ($schemaSettingsInstance) {
    elementInput = schemaFormActions.findElement(element.key);
    elementStatus = getInputStatus(elementInput?.validation);

    if (element.required && !elementInput) {
      isChecked = true;
      schemaFormActions.addElement(element.key);
    } else {
      isChecked = !!elementInput;
    }
  }

  $: if ($toggleAttributeSelector) {
    isOpenSelector = $toggleAttributeSelector === selectorId;
  }
</script>

<Attribute>
  <AttributeItem id={selectorId} disabled={!isEnable} checked={isChecked} status={elementStatus}>
    <AttributeItemHeader>
      <AttributeCheckbox
        {onCheck}
        {isChecked}
        {isRequired}
        key={element.key}
        disabled={!isEnable}
        status={elementStatus}
      />
      <AttributeItemContainer>
        <AttributeContainer>
          <AttributeLabel {toggleSelector}>
            <AttributeKey>
              {element.key}
            </AttributeKey>
            <AttributeText>
              {element.description}
              {#if element.required}
                <AttributeRequired />
              {/if}
            </AttributeText>
          </AttributeLabel>
          <AttributeToggle isOpen={isOpenSelector} {toggleSelector} />
        </AttributeContainer>
        {#if isOpenSelector}
          <AttributeSelector isActive={false} type="element" key={element.key} value={undefined} />
        {/if}
      </AttributeItemContainer>
    </AttributeItemHeader>
    {#if elementInput && elementInput.validation}
      {#each elementInput.validation.messages as inputMessage}
        <InputValidation
          status={elementInput.validation.status}
          message={inputMessage.message}
          type={inputMessage.type}
        />
      {/each}
    {/if}
  </AttributeItem>
  {#if hasSettings}
    {#each element.settings as setting}
      <ElementSetting parent={element.key} {setting} />
    {/each}
  {/if}
</Attribute>
