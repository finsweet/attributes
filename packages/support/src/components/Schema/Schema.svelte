<script lang="ts">
  import Header from '@src/components/Layout/Header.svelte';
  import Element from '@src/components/Schema/Element.svelte';
  import Setting from '@src/components/Schema/Setting.svelte';
  import FieldsList from '@src/components/Schema/FieldsList.svelte';
  import ReportHeader from '@src/components/Report/ReportHeader/ReportHeader.svelte';
  import UIService from '@src/services/UI/UIService';

  import {
    schemaSettingsKey,
    schemaData,
    schemaUI,
    schemaMode,
    SCHEMA_MODES,
    schemaSelected,
    schemaSettingsInstance,
  } from '@src/stores';

  $: {
    if ($schemaData) {
      $schemaUI = UIService('', $schemaData);
    }
  }
</script>

{#if $schemaSettingsKey && $schemaMode === SCHEMA_MODES.READY && $schemaUI}
  <div id="support-attributes">
    <Header>
      <div data-testid="attribute-header">
        Check {$schemaSelected && $schemaSelected.title}
        {#if $schemaUI.requiredInstance}
          - Instance #{$schemaSettingsInstance}
        {/if}
      </div>
    </Header>
    <ReportHeader />

    {#if $schemaUI.requiredElements.length > 0}
      <Header>
        <div>Attributes:</div>
      </Header>
      {#each $schemaUI.requiredElements as element}
        <Element {element} />
      {/each}
    {/if}
    <div class="fields">
      {#if $schemaUI.fields.length > 0}
        {#each $schemaUI.fields as field}
          <FieldsList {field} />
        {/each}
      {/if}
    </div>
    <div class="non-required">
      {#if $schemaUI.notRequiredElements.length > 0}
        <Header>
          <div>Aditional Elements</div>
        </Header>
        {#each $schemaUI.notRequiredElements as element}
          <Element {element} />
        {/each}
      {/if}
    </div>
    <div class="settings">
      {#if $schemaUI.settings.length > 0}
        <Header>
          <div>Aditional Options</div>
        </Header>
        {#each $schemaUI.settings as setting}
          <Setting {setting} />
        {/each}
      {/if}
    </div>
  </div>
{/if}
