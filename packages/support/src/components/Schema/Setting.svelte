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
  import type { AttributeSettingSchema } from '@global/types/schema';
  import type { SchemaInput, SchemaInputValidation } from '@src/types/Input.types';

  export let setting: AttributeSettingSchema;

  let isEnable = true;

  let settingInput = schemaFormActions.findSetting(setting.key);
  let elementSettingStatus: boolean | null = getInputStatus(settingInput?.validation);
  let option: string = settingInput?.option || '';

  let isChecked = !!settingInput;

  function onCheck(event: Event) {
    const input = event.target as HTMLInputElement;
    const { checked } = input;
    if (checked) {
      let index = schemaFormActions.findSettingIndex(setting.key);

      if (index === null) {
        const checkedOption: string =
          option ||
          (Array.isArray(setting.value) && setting.value[0].default) ||
          (!Array.isArray(setting.value) && setting.value.default) ||
          '';
        schemaFormActions.addSetting(setting.key, checkedOption);
        return;
      }

      schemaFormActions.enableSetting(setting.key);
      return;
    }

    schemaFormActions.disableSetting(setting.key);
  }

  function checkIsEnable(schemaForm: SchemaInput[]) {
    const localEnable = checkSettingCondition(setting, schemaForm, {
      instance: $schemaSettingsInstance,
      key: $schemaSettingsKey || '',
    });

    if (localEnable === false && isChecked === true) {
      schemaFormActions.disableSetting(setting.key);
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

  let selectorId = `setting-${setting.key}`;
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
    if (settingInput) {
      schemaFormActions.setSettingOption(setting.key, value.detail);
    }
  }

  $: if ($schemaForm) {
    checkIsEnable($schemaForm);

    settingInput = schemaFormActions.findSetting(setting.key);
    elementSettingStatus = getInputStatus(settingInput?.validation);
    if (settingInput) {
      option = settingInput.option;
    }
  }

  $: if ($schemaSettingsInstance) {
    settingInput = schemaFormActions.findSetting(setting.key);
    elementSettingStatus = getInputStatus(settingInput?.validation);
    if (settingInput) {
      option = settingInput.option;
    }

    if (settingInput && settingInput.enable === false) {
      isChecked = false;
    } else {
      isChecked = !!settingInput;
    }
  }

  $: if ($toggleAttributeSelector) {
    isOpenSelector = $toggleAttributeSelector === selectorId;
  }
</script>

<Attribute>
  <AttributeItem id={selectorId} disabled={!isEnable} checked={isChecked} status={elementSettingStatus}>
    <AttributeItemHeader>
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
            type="setting"
            key={setting.key}
            valueType={setting.value}
            value={(settingInput && settingInput.option) || ''}
            isActive={!!settingInput && settingInput.enable}
            on:change={onChange}
          />
        {/if}
      </AttributeItemContainer>
    </AttributeItemHeader>
    {#if settingInput && settingInput.validation && settingInput.enable}
      {#each settingInput.validation.messages as inputMessage}
        <InputValidation
          status={settingInput.validation.status}
          message={inputMessage.message}
          type={inputMessage.type}
        />
      {/each}
    {/if}
  </AttributeItem>
</Attribute>
