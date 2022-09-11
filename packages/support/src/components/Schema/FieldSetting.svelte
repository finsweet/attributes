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
    toggleAttributeSelector,
    schemaSettingsInstance,
    schemaSettingsKey,
  } from '@src/stores';
  import type { AttributeSettingSchema } from '@global/types/schema';
  import type { SchemaInput, SchemaInputFieldSetting, SchemaInputValidation } from '@src/types/Input.types';

  export let setting: AttributeSettingSchema;
  export let fieldKey: string;
  export let fieldIndex: string;
  export let identifier: string;

  let option: string = schemaFormActions.getFieldSettingOption(fieldKey, fieldIndex, setting.key) || '';

  let isEnable = true;

  let fieldSettingInput: SchemaInputFieldSetting | undefined = schemaFormActions.findFieldSetting(
    fieldKey,
    fieldIndex,
    setting.key
  );

  let fieldSettingStatus: boolean | null = getInputStatus(fieldSettingInput?.validation);

  let isChecked = !!fieldSettingInput;

  let selectorId = `field-setting-${fieldKey}-${fieldIndex}-${setting.key}`;

  let isOpenSelector = $toggleAttributeSelector === selectorId;

  function onCheck(event: Event) {
    const input = event.target as HTMLInputElement;
    const { checked } = input;
    if (checked) {
      let index = schemaFormActions.findFieldSettingIndex(fieldKey, fieldIndex, setting.key);

      if (index === null) {
        const checkedOption: string =
          option ||
          (Array.isArray(setting.value) && setting.value[0].default) ||
          (!Array.isArray(setting.value) && setting.value.default) ||
          '';
        schemaFormActions.addFieldSetting(fieldKey, fieldIndex, setting.key, checkedOption);
        return;
      }

      schemaFormActions.enableFieldSetting(fieldKey, fieldIndex, setting.key);
      return;
    }

    schemaFormActions.disableFieldSetting(fieldKey, fieldIndex, setting.key);
  }

  function checkIsEnable(schemaForm: SchemaInput[]) {
    const localEnable = checkSettingCondition(setting, schemaForm, {
      instance: $schemaSettingsInstance,
      key: $schemaSettingsKey || '',
    });

    if (localEnable === false && isChecked === true) {
      schemaFormActions.disableFieldSetting(fieldKey, fieldIndex, setting.key);
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

  function toggleSelector() {
    if (!isOpenSelector) {
      $toggleAttributeSelector = selectorId;
      return;
    }

    $toggleAttributeSelector = null;
    isOpenSelector = false;
  }

  function onChange(value: CustomEvent<string>) {
    if (fieldSettingInput) {
      schemaFormActions.setFieldSettingOption(fieldKey, fieldIndex, setting.key, value.detail);
    }
  }

  $: {
    checkIsEnable($schemaForm);
    fieldSettingInput = schemaFormActions.findFieldSetting(fieldKey, fieldIndex, setting.key);
    fieldSettingStatus = getInputStatus(fieldSettingInput?.validation);

    if (fieldSettingInput && fieldSettingInput.enable === false) {
      isChecked = false;
    } else {
      isChecked = !!fieldSettingInput;
    }
  }

  $: if ($toggleAttributeSelector) {
    isOpenSelector = $toggleAttributeSelector === selectorId;
  }
</script>

<AttributeItem id={selectorId} checked={isChecked} status={fieldSettingStatus}>
  <AttributeItemHeader>
    <AttributeCheckbox {onCheck} {isChecked} isRequired={false} key={setting.key} status={fieldSettingStatus} />
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
      {#if isOpenSelector && setting.specializations === undefined}
        <AttributeSelector
          type="fieldSetting"
          key={setting.key}
          {fieldKey}
          {identifier}
          valueType={setting.value}
          value={(fieldSettingInput && fieldSettingInput.option) || ''}
          isActive={!!fieldSettingInput && fieldSettingInput.enable}
          on:change={onChange}
        />
      {:else if isOpenSelector && setting.specializations}
        {#each setting.specializations as specilization}
          <AttributeSelector
            type="fieldSetting"
            {identifier}
            {fieldKey}
            forceStatic
            key={setting.key}
            valueType={setting.value}
            value={specilization.value}
            isActive={!!fieldSettingInput && fieldSettingInput.enable}
            on:change={onChange}
          />
        {/each}
      {/if}
    </AttributeItemContainer>
  </AttributeItemHeader>
  {#if fieldSettingInput && fieldSettingInput.validation && fieldSettingInput.enable}
    {#each fieldSettingInput.validation.messages as inputMessage}
      <InputValidation
        status={fieldSettingInput.validation.status}
        message={inputMessage.message}
        type={inputMessage.type}
      />
    {/each}
  {/if}
</AttributeItem>
