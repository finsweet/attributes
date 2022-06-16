<script type="ts">
  import ArrowToggle from '@src/components/Layout/Icons/ArrowToggle.svelte';
  export let isOpen: boolean;
</script>

<div>
  <ArrowToggle inverse={!isOpen} />
</div>

<style>
  div {
    cursor: pointer;
  }
</style>
