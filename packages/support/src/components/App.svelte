<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '@src/components/Layout/Header.svelte';
  import Config from '@src/components/Config/Config.svelte';
  import Schema from '@src/components/Schema/Schema.svelte';
  // import Tutorial from '@src/components/Tutorial.svelte';
  import Actions from '@src/components/Actions/Actions.svelte';
  import Loading from '@src/components/Loading.svelte';
  import Minimize from '@src/components/Minimize.svelte';
  import Initial from '@src/components/Initial.svelte';
  import type { AttributeSchema } from '$global/types/schema';
  import type { AttributeLoaded } from '@src/types/Schema.types';
  import type { AttributesData, SupportedAttributeData } from '$packages/docs/src/utils/types';
  import { isScriptLoaded } from '@src/services/Attributes/Script/ScriptService';

  import {
    schemas,
    schemaSelected,
    schemaData,
    schemaSettingsKey,
    walkthroughMode,
    WALKTHROUGH_MODES,
    schemaMode,
    SCHEMA_MODES,
    isLoadingWalkthrough,
    isLoadingSchema,
    isValidating,
  } from '@src/stores';

  async function loadSchema(inputFile: string) {
    const request = await fetch(inputFile);
    const data: AttributeSchema = await request.json();

    schemaData.set(data);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    $schemaMode = SCHEMA_MODES.READY;
  }

  async function loadAttributes() {
    const request = await fetch('https://cdn.jsdelivr.net/npm/@finsweet/attributes-docs@1/attributes.json');
    //const request = await fetch('http://localhost:3000/packages/docs/attributes.json');
    const data: AttributesData = await request.json();

    const attributesWithLoadPromises = data
      .filter((attribute) => attribute.allowSupport)
      .map(async (attribute): Promise<AttributeLoaded> => {
        const supportAttribute = attribute as SupportedAttributeData;

        /// const { baseSrc, schemaSrc, scriptSrc, key } = supportAttribute;
        const { baseSrc, schemaSrc, scriptSrc } = supportAttribute;

        const schemaFile = `${baseSrc}/${schemaSrc}`;
        // const schemaFile = `${baseSrc}/${schemaSrc}`.replace(baseSrc, `http://localhost:3000/packages/${key}`);
        const scriptFile = `${baseSrc}/${scriptSrc}`;

        const loaded = isScriptLoaded(scriptFile);

        return {
          ...supportAttribute,
          schemaFile,
          scriptFile,
          loaded,
        };
      });

    const attributesWithLoad: AttributeLoaded[] = await Promise.all(attributesWithLoadPromises);

    schemas.set(attributesWithLoad);
  }

  onMount(async () => {
    $walkthroughMode = WALKTHROUGH_MODES.INITIALIZING;

    await loadAttributes();

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    $walkthroughMode = WALKTHROUGH_MODES.READY;

    const url = new URLSearchParams(window.location.search);
    const selected = url.get('selected');

    if (selected && selected !== '') {
      $schemaSettingsKey = selected;
      $schemaMode = SCHEMA_MODES.LOADING;
      return;
    }

    if ($schemaMode !== SCHEMA_MODES.READY) {
      $schemaMode = SCHEMA_MODES.READY;
    }
  });

  let minimize = false;
  function toggleMinimize() {
    minimize = !minimize;
  }

  $: {
    if ($schemaSelected && $isLoadingWalkthrough === false && $isLoadingSchema === true) {
      $schemaData = null;
      loadSchema(($schemaSelected as AttributeLoaded).schemaFile);
    }
  }

  $: if ($schemaSelected) {
    loadSchema(($schemaSelected as AttributeLoaded).schemaFile);
  }
</script>

<div id="walkthrough" data-testid="walkthrough" class="walkthrough" class:minimize={minimize === true}>
  <Loading isLoading={$isLoadingWalkthrough || $isLoadingSchema || $isValidating} />
  <Minimize {toggleMinimize} isMinimized={minimize} />
  <div id="support-internal" class="walkthrough_interface">
    <Header>
      <div>Attributes Automated Support Service</div>
      <!--<Tutorial />-->
    </Header>
    <Config />
    {#if $schemaSettingsKey}
      <Schema />
    {:else}
      <Initial />
    {/if}
  </div>
  {#if $schemaSettingsKey}
    <Actions />
  {/if}
</div>

<style>
  .walkthrough {
    position: fixed;
    left: auto;
    font-family: 'Graphik';
    top: 0%;
    right: 0%;
    bottom: 0%;
    display: flex;
    width: 30rem;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #252525;
    line-height: 1.5;
    z-index: 9999;
    transition: all 1s ease-in-out;
  }

  .walkthrough.minimize {
    right: -30rem;
    transition: all 1s ease-in-out;
  }

  .walkthrough_interface {
    position: relative;
    left: auto;
    top: 0%;
    right: 0%;
    bottom: 0%;
    overflow: auto;
    width: 30rem;
    padding-bottom: 5rem;
    flex: 1;
    background-color: #252525;
    color: #ccc;
    box-sizing: border-box;
  }

  .walkthrough_interface::-webkit-scrollbar {
    width: 1rem;
  }
  /*track*/
  .walkthrough_interface::-webkit-scrollbar-track {
    background: rgb(0, 0, 0);
  }
  /*thumb*/
  .walkthrough_interface::-webkit-scrollbar-thumb {
    background: #474747;
  }
</style>
