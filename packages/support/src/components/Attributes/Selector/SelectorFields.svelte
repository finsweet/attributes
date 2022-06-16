<script lang="ts">
  import Options from './Fields/Options.svelte';
  import String from './Fields/String.svelte';
  import CommaSeparatedString from './Fields/CommaSeparatedString.svelte';
  import Float from './Fields/Float.svelte';
  import CommaSeparatedFloat from './Fields/CommaSeparatedFloat.svelte';
  import Int from './Fields/Int.svelte';
  import CommaSeparatedInt from './Fields/CommaSeparatedInt.svelte';
  import type { AttributeSettingValuePrimitive, AttributeSettingValueOptions } from '@global/types/schema';

  export let id: string;
  export let value: AttributeSettingValuePrimitive | AttributeSettingValueOptions;
  export let option: string;
  export let isActive: boolean;
</script>

<div class="selector__options">
  {#if value.type === 'options'}
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
</style>
