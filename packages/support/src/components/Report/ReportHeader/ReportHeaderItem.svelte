<script lang="ts">
  import StatusIcon from '@src/components/Layout/Icons/StatusIcon.svelte';
  import ArrowIcon from '@src/components/Layout/Icons/ArrowDown.svelte';
  import AttributeKey from '@src/components/Attributes/AttributeKey.svelte';
  import { scrollInto, propagateClickToField } from '@src/services/DOM/Utils/Utils';

  export let message: string;
  export let key: string;
  export let id: string | null;

  function scrollToAttribute() {
    if (id) {
      propagateClickToField(`#${id}`);
      scrollInto(`#${id}`, 0);
    }
  }
</script>

<div class="tool_results-item" class:app-error={id === null} on:click={scrollToAttribute}>
  <StatusIcon status={false} />
  <div class="tool_results-item-block">
    <AttributeKey>
      {key}
    </AttributeKey>
    {@html message}
  </div>
  <ArrowIcon />
</div>

<style>
  .tool_results-item {
    grid-column-start: span 1;
    grid-column-end: span 1;
    grid-row-start: span 1;
    grid-row-end: span 1;
    display: grid;
    justify-content: start;
    justify-items: start;
    align-items: center;
    align-content: center;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    text-decoration: none;
    max-width: 100%;
    cursor: pointer;
    padding: 1rem 1.5rem;
    background-color: #442b2c;
    color: #fff;
    border-bottom: 1px solid #000;
  }

  .tool_results-item.app-error {
    cursor: default;
  }

  .app-error :global(a) {
    text-decoration: underline;
    font-weight: 500;
    color: #fff;
  }

  .tool_results-item > :global(.icon-status) {
    height: 100%;
  }

  .tool_results-item-block {
    grid-column-start: span 1;
    grid-column-end: span 1;
    grid-row-start: span 1;
    grid-row-end: span 1;
  }

  /* .tool_results-item-block :global(.validator-highlight) {
    font-weight: 700;
  }

  .tool_results-item-block :global(.validator-label) {
    font-weight: 700;
  }

  .tool_results-item-block :global(.validator-attribute) {
    display: inline-block;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    background-color: #444;
    color: #e7e7e7;
    font-size: 0.875rem;
    box-sizing: border-box;
  } */
</style>
