<script type="ts">
  export let isOpen = true;
</script>

<div class="field_wrapper" class:is-close={isOpen === false}>
  <slot />
</div>

<style>
  .field_wrapper.is-close {
    display: none;
  }
</style>
