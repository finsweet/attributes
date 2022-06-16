<script lang="ts">
  import type { ItemError } from '@src/types/Error.types';

  export let validate: (value: string) => boolean | Error;

  // let timer: NodeJS.Timeout;
  let isValidInput: boolean | undefined = undefined;
  let inputValidationMessage: string | undefined = undefined;
  let isTouched = false;

  function validateInput(event: KeyboardEvent & { currentTarget: HTMLInputElement }): void {
    isTouched = true;

    const typeEvent = event as unknown as Event & { target: { value: string } };
    if (typeEvent === null) {
      throw new Error('Missing event');
    }
    try {
      validate(typeEvent.target.value);
      isValidInput = true;
      inputValidationMessage = undefined;
    } catch (e) {
      isValidInput = false;
      inputValidationMessage = (e as ItemError).message;
    }
  }

  function inputValidate(event: KeyboardEvent & { currentTarget: HTMLInputElement }): void {
    validateInput(event);
  }
</script>

<div class="form__controller">
  <slot isValid={isValidInput} {isTouched} inputValidator={inputValidate} />
  {#if !isValidInput && isTouched}
    <div class="form__controller__feedback" data-testgroup="setting-options-error">{inputValidationMessage}</div>
  {/if}
</div>

<style>
  .form__controller__feedback {
    color: #ff6868;
    font-size: 0.75rem;
    padding: 0.2rem 1rem 0.25rem 0.5rem;
  }
</style>
