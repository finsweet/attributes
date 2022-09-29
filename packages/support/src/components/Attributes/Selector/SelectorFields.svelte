<script lang="ts">
  import Options from './Fields/Options.svelte';
  import String from './Fields/String.svelte';
  import CommaSeparatedString from './Fields/CommaSeparatedString.svelte';
  import Float from './Fields/Float.svelte';
  import CommaSeparatedFloat from './Fields/CommaSeparatedFloat.svelte';
  import Int from './Fields/Int.svelte';
  import CommaSeparatedInt from './Fields/CommaSeparatedInt.svelte';
  import type { AttributeValue } from '$global/types/schema';
  import SelectorRadio from './SelectorRadio.svelte';

  export let id: string;
  export let value: AttributeValue | AttributeValue[];
  export let option: string;
  export let isActive: boolean;
  let optionBuffer: string | null = null;
  let activeBuffer: string | null = null;
</script>

<div class="selector__options">
  {#if Array.isArray(value)}
    {#each value as settingType}
      <div class="selector__options__multiple">
        <SelectorRadio
          {isActive}
          on:change
          checked={settingType.type === activeBuffer}
          {id}
          value={settingType}
          bind:activeBuffer
          bind:optionBuffer
          bind:option
        />

        {#if settingType.type === 'options'}
          <Options
            on:change
            isActive={isActive && activeBuffer === 'options'}
            bind:attributeValue={option}
            value={settingType}
          />
        {:else if settingType.type === 'boolean'}
          <span />
        {:else if settingType.type === 'string'}
          <String
            on:change
            isActive={isActive && activeBuffer === 'string'}
            bind:attributeValue={option}
            value={settingType}
            {id}
          />
        {:else if settingType.type === 'commaSeparatedString'}
          <CommaSeparatedString
            on:change
            isActive={isActive && activeBuffer === 'commaSeparatedString'}
            bind:attributeValue={option}
            value={settingType}
            {id}
          />
        {:else if settingType.type === 'float'}
          <Float
            on:change
            isActive={isActive && activeBuffer === 'float'}
            bind:attributeValue={option}
            value={settingType}
            {id}
          />
        {:else if settingType.type === 'commaSeparatedFloat'}
          <CommaSeparatedFloat
            on:change
            isActive={isActive && activeBuffer === 'commaSeparatedFloat'}
            bind:attributeValue={option}
            {id}
            value={settingType}
          />
        {:else if settingType.type === 'int'}
          <Int
            on:change
            isActive={isActive && activeBuffer === 'int'}
            bind:attributeValue={option}
            value={settingType}
            {id}
          />
        {:else if settingType.type === 'commaSeparatedInt'}
          <CommaSeparatedInt
            on:change
            isActive={isActive && activeBuffer === 'commaSeparatedInt'}
            bind:attributeValue={option}
            {id}
            value={settingType}
          />
        {:else}
          <div class="missing">Missing componenent for ${settingType.type}</div>
        {/if}
      </div>
    {/each}
  {:else if value.type === 'options'}
    <Options on:change {isActive} bind:attributeValue={option} {value} />
  {:else if value.type === 'string'}
    <String on:change {isActive} bind:attributeValue={option} {value} {id} />
  {:else if value.type === 'commaSeparatedString'}
    <CommaSeparatedString on:change {isActive} bind:attributeValue={option} {value} {id} />
  {:else if value.type === 'float'}
    <Float on:change {isActive} bind:attributeValue={option} {value} {id} />
  {:else if value.type === 'commaSeparatedFloat'}
    <CommaSeparatedFloat on:change {isActive} bind:attributeValue={option} {id} {value} />
  {:else if value.type === 'int'}
    <Int on:change {isActive} bind:attributeValue={option} {value} {id} />
  {:else if value.type === 'commaSeparatedInt'}
    <CommaSeparatedInt on:change {isActive} bind:attributeValue={option} {id} {value} />
  {:else}
    <div class="missing">Missing componenent for ${value.type}</div>
  {/if}
</div>

<style>
  .selector__options {
    display: block;
    font-size: 0.875rem;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: 0.02rem;
    box-sizing: border-box;
    color: #ccc;
  }

  .selector__options__multiple {
    display: flex;
    align-items: center;
  }

  .selector__options__multiple > :global(.selector__value) {
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
    margin-left: 0.75rem;
  }
</style>
