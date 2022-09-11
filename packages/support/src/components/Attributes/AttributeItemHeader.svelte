<script lang="ts">
  export let isChild = false;
</script>

<div class="attribute_item_wrapper" class:is-child={isChild}>
  <div class="attribute_item_header">
    <slot />
  </div>
</div>

<style>
  .attribute_item_wrapper {
    box-sizing: border-box;
  }

  .attribute_item_wrapper.is-child {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .attribute_item_wrapper.is-child :global(.attribute_checkbox) {
    margin-top: 0;
  }

  .attribute_item_wrapper.is-child :global(.attribute_container) {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .attribute_item_wrapper.is-child > .attribute_item_header {
    margin-left: 1.5rem;
    border-left: 1px solid #000;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .attribute_item_header {
    display: flex;
    padding-right: 2rem;
    padding-left: 1.5rem;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
