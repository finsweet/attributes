<script lang="ts">
  import { onMount } from 'svelte';
  import ExternalLink from '@src/components/Layout/Icons/external-link.svg';
  import Selector from './SelectorStatic.svelte';
  import CustomizableSelector from './SelectorEditable.svelte';
  import { schemaSettingsKey, schemaSettingsInstance, schemaSelected, schemaData } from '@src/stores';
  import { createHighlight, enableHighlight, disableHighlight } from '@src/services/Highlight/HighlightService';

  import type { AttributeValue } from '@global/types/schema';
  import type { Highlight } from '@src/types/Highlight.types';
  import type { SchemaInputType } from '@src/types/Input.types';

  export let key: string;
  export let fieldKey: string | null = null;
  export let identifier: string | null = null;
  export let specialization: string | null = null;
  export let value = '';

  export let type: SchemaInputType;
  export let isActive: boolean | undefined = undefined;

  export let valueType: AttributeValue | undefined = undefined;
  export let forceStatic = false;

  let selectorName: string;
  let selectorValue: string;
  let highlight: Highlight;

  let docs: string = ($schemaSelected && `${$schemaSelected.href}#${key}`) || '';

  onMount(async () => {
    const schemaSettings = {
      key: $schemaSettingsKey || '',
      instance: $schemaSettingsInstance,
    };

    if ($schemaData) {
      highlight = createHighlight(fieldKey || key, type, identifier, specialization, $schemaData, schemaSettings);
    }
  });

  function createSelector(instances: number) {
    switch (type) {
      case 'element':
        selectorName = `fs-${$schemaSettingsKey}-element`;
        selectorValue = (instances > 1 && `${key}-${instances}`) || key;
        break;
      case 'field':
        selectorName = `fs-${$schemaSettingsKey}-${key}`;
        selectorValue = value;
        break;
      case 'elementSetting':
      case 'fieldSetting':
        selectorName = `fs-${$schemaSettingsKey}-${key}`;

        if (value) {
          selectorValue = value;
        }

        if (valueType?.type === 'boolean') {
          selectorValue = 'true';
        }
        break;

      default:
        throw new Error('Selector: Missing type');
    }
  }

  function onMouseEnter() {
    enableHighlight(highlight);
  }

  function onMouseLeave() {
    if (highlight) {
      disableHighlight(highlight);
    }
  }

  createSelector($schemaSettingsInstance);

  $: {
    createSelector($schemaSettingsInstance);
  }

  $: if (value) {
    createSelector($schemaSettingsInstance);
  }

  $: if (value) {
    if (highlight) {
      onMouseLeave();
    }
  }

  $: if (specialization) {
    const schemaSettings = {
      key: $schemaSettingsKey || '',
      instance: $schemaSettingsInstance,
    };

    if ($schemaData) {
      highlight = createHighlight(fieldKey || key, type, identifier, specialization, $schemaData, schemaSettings);
    }
  }
</script>

<div class="attribute-selector-container" on:mouseenter|self={onMouseEnter} on:mouseleave={onMouseLeave}>
  <div class="attribute-selector-interface">
    <div class="attribute-selector-block" data-testid="name">
      <Selector label="Name" selector={selectorName} />
    </div>
    <div class="attribute-selector-block" data-testid="value">
      {#if (type === 'fieldSetting' || type === 'elementSetting') && !forceStatic && valueType !== undefined && valueType.type !== 'boolean' && isActive !== undefined}
        <CustomizableSelector {valueType} on:change label="Value" {isActive} option={value} />
      {:else}
        <Selector label="Value" selector={selectorValue} />
      {/if}
    </div>
    <a class="attribute-selector-docs" target="_blank" href={docs}>
      <div>go to docs</div>
      <div class="attribute-selector-docs-link">
        <ExternalLink />
      </div>
    </a>
  </div>
</div>

<style>
  .attribute-selector-container {
    margin-left: -3rem;
    padding-bottom: 1rem;
    background-color: transparent;
    display: block;
    position: relative;
    min-width: 100%;
  }

  .attribute-selector-interface {
    position: relative;
    display: grid;
    width: 100%;
    padding: 1rem;
    grid-auto-flow: row;
    grid-auto-columns: 1fr;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    background-color: #474747;
    box-sizing: border-box;
  }

  .attribute-selector-block {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .attribute-selector-docs {
    display: flex;
    margin-left: 3rem;
    padding: 0.25rem 1rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(17, 17, 17, 0.2);
    color: #979797;
    font-size: 0.875rem;
    text-decoration: none;
    max-width: 100%;
  }

  .attribute-selector-docs-link :global(svg) {
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-left: 0.5rem;
  }
</style>
