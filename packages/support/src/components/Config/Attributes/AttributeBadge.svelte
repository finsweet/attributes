<script lang="ts">
  export let type: 'on-page' | 'not-on-page';
</script>

{#if type === 'on-page'}
  <div class="tool_select-badge tool_select-badge-on-page">on page</div>
{/if}

{#if type === 'not-on-page'}
  <div class="tool_select-badge tool_select-badge-not-on-page">not on page</div>
{/if}

<style>
  .tool_select-badge {
    background-attachment: scroll !important;
    margin-left: 0.5rem;
    padding: 0.1rem 0.5rem;

    font-size: 0.75rem;
    font-weight: 500;
  }

  .tool_select-badge-on-page {
    background-color: #5cca58;
    color: #000;
  }

  .tool_select-badge-not-on-page {
    background-color: #111;
    color: #7e7e7e;
  }
</style>
