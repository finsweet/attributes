<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let inputValidator: (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;
  export let value: string;
  export let id: string;
  export let pattern: string | undefined = undefined;
  export let isTouched: boolean | undefined;
  export let isValid: boolean | undefined;
  export let type: string;
  export let step: string | undefined = undefined;
  export let disabled = false;

  let dispatch = createEventDispatcher<{ change: string }>();

  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    dispatch('change', input.value);
  }
</script>

<label class:valid={isValid} class:invalid={isTouched && !isValid} class:disabled>
  <input
    on:input={onInput}
    use:typeAction
    {id}
    {step}
    {pattern}
    {disabled}
    on:keyup={inputValidator}
    placeholder="Add the value here"
    bind:value
    class:valid={isValid}
    class:invalid={isTouched && !isValid}
    data-testid="selector-input"
  />
</label>

<style>
  label {
    display: flex;
    box-sizing: border-box;
    align-items: center;
  }

  label.disabled {
    opacity: 0.5;
  }

  /*
  div.valid {
    border: 1px solid green;
  }

  div.invalid {
    border: 1px solid red;
  } */

  input {
    padding: 0.2rem 0.25rem 0.25rem 0.5rem;
    border-style: solid;
    border-width: 1px;
    border-color: #000;
    background-color: #1a1a1a;
    color: #bcfd2e;
    display: block;
    width: 100%;
    height: 38px;
    font-size: 14px;
    line-height: 1.42857143;
    box-sizing: border-box;
    outline: none;
  }

  input:focus {
    color: #bcfd2e;
    border-style: solid;
    border-width: 1px;
    border-color: #bcfd2e;
  }
</style>
