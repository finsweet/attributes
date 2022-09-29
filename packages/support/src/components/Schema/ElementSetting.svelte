<script lang="ts">
  import AttributeItem from '@src/components/Attributes/AttributeItem.svelte';
  import AttributeKey from '@src/components/Attributes/AttributeKey.svelte';
  import AttributeItemHeader from '@src/components/Attributes/AttributeItemHeader.svelte';
  import AttributeCheckbox from '@src/components/Attributes/AttributeCheckbox.svelte';
  import AttributeItemContainer from '@src/components/Attributes/AttributeItemContainer.svelte';
  import AttributeContainer from '@src/components/Attributes/AttributeContainer.svelte';
  import AttributeLabel from '@src/components/Attributes/AttributeLabel.svelte';
  import AttributeText from '@src/components/Attributes/AttributeText.svelte';
  import AttributeToggle from '@src/components/Attributes/AttributeToggle.svelte';
  import AttributeSelector from '@src/components/Attributes/Selector/Selector.svelte';
  import InputValidation from '@src/components/Report/ReportAttribute.svelte';
  import { checkSettingCondition } from '@src/services/Attributes/Schema/SchemaService';
  import {
    schemaForm,
    schemaFormActions,
    schemaSettingsInstance,
    toggleAttributeSelector,
    schemaSettingsKey,
  } from '@src/stores';
  import type { AttributeSettingSchema } from '$global/types/schema';
  import type { SchemaInput, SchemaInputValidation } from '@src/types/Input.types';

  export let setting: AttributeSettingSchema;
  export let parent: string;

  let isEnable = true;

  let elementSettingInput = schemaFormActions.findElementSetting(parent, setting.key);
  let elementSettingStatus: boolean | null = getInputStatus(elementSettingInput?.validation);
  let option: string = elementSettingInput?.option || '';

  let isChecked = !!elementSettingInput;

  function onCheck(event: Event) {
    const input = event.target as HTMLInputElement;
    const { checked } = input;
    if (checked) {
      const element = schemaFormActions.findElement(parent);
      if (!element) {
        schemaFormActions.addElement(parent);
      }

      let index = schemaFormActions.findElementSettingIndex(parent, setting.key);

      if (index === null) {
        const checkedOption: string =
          option ||
          (Array.isArray(setting.value) && setting.value[0].default) ||
          (!Array.isArray(setting.value) && setting.value.default) ||
          '';
        schemaFormActions.addElementSetting(parent, setting.key, checkedOption);
        return;
      }

      schemaFormActions.enableElementSetting(parent, setting.key);
      return;
    }

    schemaFormActions.disableElementSetting(parent, setting.key);
  }

  function checkIsEnable(schemaForm: SchemaInput[]) {
    const localEnable = checkSettingCondition(setting, schemaForm, {
      instance: $schemaSettingsInstance,
      key: $schemaSettingsKey || '',
    });

    if (localEnable === false && isChecked === true) {
      schemaFormActions.disableElementSetting(parent, setting.key);
      isChecked = false;
    }

    if (isEnable !== localEnable) {
      isEnable = localEnable;
    }
  }

  function getInputStatus(validation: SchemaInputValidation | null | undefined): boolean | null {
    if (validation === null || validation === undefined) {
      return null;
    }

    return validation.status;
  }

  let selectorId = `element-${parent}-${setting.key}`;
  let isOpenSelector = $toggleAttributeSelector === selectorId;

  function toggleSelector() {
    if (!isOpenSelector) {
      $toggleAttributeSelector = selectorId;
      return;
    }

    $toggleAttributeSelector = null;
    isOpenSelector = false;
  }

  function onChange(value: CustomEvent<string>) {
    if (elementSettingInput) {
      schemaFormActions.setElementSettingOption(parent, setting.key, value.detail);
    }
  }

  $: if ($schemaForm) {
    checkIsEnable($schemaForm);

    elementSettingInput = schemaFormActions.findElementSetting(parent, setting.key);
    elementSettingStatus = getInputStatus(elementSettingInput?.validation);
    option = elementSettingInput?.option;
  }

  $: if ($schemaSettingsInstance) {
    elementSettingInput = schemaFormActions.findElementSetting(parent, setting.key);
    elementSettingStatus = getInputStatus(elementSettingInput?.validation);
    option = elementSettingInput?.option;

    if (elementSettingInput && elementSettingInput.enable === false) {
      isChecked = false;
    } else {
      isChecked = !!elementSettingInput;
    }
  }

  $: if ($toggleAttributeSelector) {
    isOpenSelector = $toggleAttributeSelector === selectorId;
  }
</script>

<AttributeItem id={selectorId} disabled={!isEnable} checked={isChecked} status={elementSettingStatus}>
  <AttributeItemHeader isChild>
    <AttributeCheckbox
      {onCheck}
      {isChecked}
      isRequired={false}
      key={setting.key}
      disabled={!isEnable}
      status={elementSettingStatus}
    />
    <AttributeItemContainer>
      <AttributeContainer>
        <AttributeLabel {toggleSelector}>
          <AttributeKey>
            {setting.key}
          </AttributeKey>
          <AttributeText>
            {setting.description}
          </AttributeText>
        </AttributeLabel>
        <AttributeToggle isOpen={isOpenSelector} {toggleSelector} />
      </AttributeContainer>
      {#if isOpenSelector}
        <AttributeSelector
          type="elementSetting"
          key={setting.key}
          valueType={setting.value}
          value={(elementSettingInput && elementSettingInput.option) || ''}
          isActive={!!elementSettingInput && elementSettingInput.enable}
          on:change={onChange}
        />
      {/if}
    </AttributeItemContainer>
  </AttributeItemHeader>
  {#if elementSettingInput && elementSettingInput.validation && elementSettingInput.enable}
    {#each elementSettingInput.validation.messages as inputMessage}
      <InputValidation
        status={elementSettingInput.validation.status}
        message={inputMessage.message}
        type={inputMessage.type}
      />
    {/each}
  {/if}
</AttributeItem>
