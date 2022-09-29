<script lang="ts">
  import type { AttributeValue } from '$global/types/schema';
  import { createEventDispatcher } from 'svelte';

  export let checked: boolean;
  export let isActive: boolean;
  export let id: string;
  export let value: AttributeValue;
  export let activeBuffer: string | null;
  export let optionBuffer: string | null;
  export let option: string;

  const dispatch = createEventDispatcher<{ change: string }>();
</script>

<label class="radio" data-testid={`${id}-${value.type}`}>
  <div class="radio__mark" class:selected={checked} />
  <input
    disabled={!isActive}
    type="radio"
    name={id}
    class="radio__input"
    on:change={() => {
      activeBuffer = value.type;

      if (value.type === 'boolean') {
        option = 'true';
        optionBuffer = option;

        dispatch('change', option);
        return;
      }

      option = optionBuffer || '';

      dispatch('change', option);
    }}
  />
  <span>{value.type === 'boolean' ? 'true' : 'Value'}</span>
</label>

<style>
  .radio {
    display: flex;
    flex-direction: row;
    margin-bottom: 0rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0rem;
    align-items: center;
    box-sizing: border-box;
    margin-right: 1rem;
  }

  .radio__mark {
    box-sizing: border-box;
    width: 1rem;
    height: 1rem;
    margin-top: 0rem;
    margin-right: 0.75rem;
    margin-left: 0px;
    border-style: solid;
    border-width: 2px;
    border-color: #979797;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
  }

  .radio__input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  .radio__mark.selected {
    border-color: #bcfd2e;
    border-top-width: 4px;
    border-bottom-width: 4px;
    border-left-width: 4px;
    border-right-width: 4px;
  }
</style>
