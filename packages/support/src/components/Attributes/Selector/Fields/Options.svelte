<script lang="ts">
  import SelectDisplay from '@src/components/Layout/Form/SelectDisplay.svelte';
  import SelectDropdown from '@src/components/Layout/Form/SelectDropdown.svelte';
  import SelectOption from '@src/components/Layout/Form/SelectOption.svelte';
  import type { AttributeSettingValueOptions } from '$global/types/schema';
  import { createEventDispatcher } from 'svelte';
  // import SolutionIcon from '@src/components/Layout/Icons/tips-icon.svg';

  export let value: AttributeSettingValueOptions;
  export let attributeValue: string | undefined;

  export let isActive: boolean;

  let dispatch = createEventDispatcher<{ change: string }>();

  let isOpen = false;
  let selected = value.default;

  // let selectedDescription: string;

  function toggleOptions() {
    if (isActive) {
      isOpen = !isOpen;
    }
  }

  function forceClose() {
    if (isOpen) {
      isOpen = false;
    }
  }

  function selectAttribute(value: string) {
    dispatch('change', value);
    forceClose();
  }

  $: {
    attributeValue = attributeValue || selected;

    // if (selected) {
    //   let selectedItem = value.options.find((option) => option.value === selected);
    //   if (selectedItem) {
    //     selectedDescription = selectedItem.description;
    //   }
    // }
  }
</script>

<SelectDisplay {isOpen} on:click={toggleOptions} disabled={!isActive} testId="settings-select">
  {#if attributeValue}
    {attributeValue}
  {:else}
    Select value
  {/if}
</SelectDisplay>

{#if isOpen}
  <SelectDropdown on:click_outside={forceClose}>
    {#each value.options as option}
      <SelectOption
        isSelected={attributeValue === option.value}
        on:click={() => selectAttribute(option.value)}
        testId="settings-select-option"
      >
        {option.value}
      </SelectOption>
    {/each}
  </SelectDropdown>
{/if}
