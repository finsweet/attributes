<script lang="ts">
  export let id: string;
  export let disabled = false;
  export let checked = false;
  export let status: boolean | null;

  import { isSubmitted } from '@src/stores';
</script>

<div
  {id}
  class="attribute_item"
  class:disabled
  class:unchecked={$isSubmitted && !checked}
  class:is-success={status === true}
  class:is-error={status === false}
>
  <slot />
</div>

<style>
  .attribute_item {
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #000;
  }

  .attribute_item.unchecked {
    opacity: 0.5;
  }

  .attribute_item.disabled {
    opacity: 0.1;
  }

  .attribute_item.is-success {
    background-color: #222b22;
  }

  .attribute_item.is-error {
    background-color: rgba(238, 64, 76, 0.1);
  }
</style>
