<script lang="ts">
  import SelectDisplay from '@src/components/Layout/Form/SelectDisplay.svelte';
  import SelectDropdown from '@src/components/Layout/Form/SelectDropdown.svelte';
  import SelectOption from '@src/components/Layout/Form/SelectOption.svelte';
  import type { FieldSpecialization } from '$global/types/schema';
  import type { SchemaInputField, FieldChangeSpecialization } from '@src/types/Input.types';

  export let options: FieldSpecialization[];
  export let fieldInput: SchemaInputField;
  export let changeFieldElement: FieldChangeSpecialization;

  let isOpen = false;

  function toggleOptions() {
    isOpen = !isOpen;
  }

  function forceClose() {
    if (isOpen) {
      isOpen = false;
    }
  }

  function onSelect(element: string) {
    return function () {
      changeFieldElement(fieldInput.index, element);
      forceClose();
    };
  }

  let specialization = fieldInput.specialization || 'Select an option';

  $: {
    specialization = fieldInput.specialization || 'Select an option';
  }
</script>

<div>
  <SelectDisplay on:click={toggleOptions} {isOpen} testId="field-specialization">{specialization}</SelectDisplay>
  {#if isOpen}
    <SelectDropdown on:click_outside={forceClose}>
      {#each options as option (option.key)}
        <SelectOption
          testId="field-specialization-option"
          on:click={onSelect(option.key)}
          isSelected={specialization === option.key}
        >
          {option.key}
        </SelectOption>
      {/each}
    </SelectDropdown>
  {/if}
</div>

<style>
  div {
    z-index: 99;
    width: 100%;
    margin-left: 1rem;
    display: inline-block;
    position: relative;
    text-align: left;
    margin-right: auto;
    box-sizing: border-box;
  }
</style>
