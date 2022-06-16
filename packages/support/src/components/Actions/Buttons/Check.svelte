<script lang="ts">
  import { validateInputForm } from '@src/services/Attributes/AttributesService';
  import { scrollTo } from '@src/services/DOM/Utils/Utils';

  import {
    schemaData,
    schemaForm,
    schemaSettingsInstance,
    schemaSettingsKey,
    VALIDATE_MODES,
    validatingMode,
    isSubmitted,
    appError,
  } from '@src/stores';

  async function validateForm() {
    if (!$schemaData) {
      return;
    }

    if ($schemaSettingsKey === null) {
      return;
    }

    $appError = false;

    const schemaSettings = {
      key: $schemaSettingsKey,
      instance: $schemaSettingsInstance,
    };

    $validatingMode = VALIDATE_MODES.VALIDATING;

    try {
      $schemaForm = await validateInputForm($schemaForm, $schemaData, schemaSettings);
    } catch (e) {
      $appError = true;
      console.error(e);
    }

    scrollTo('#support-internal', 100);

    setTimeout(function () {
      $validatingMode = VALIDATE_MODES.READY;
    }, 1000);

    $isSubmitted = true;
  }
</script>

<button on:click={validateForm} data-testid="run-check"> Run Check </button>

<style>
  button {
    position: relative;
    left: 0%;
    top: auto;
    right: 0%;
    bottom: 0%;
    z-index: 99;
    width: 100%;
    padding: 0.75rem 2rem;
    flex: 1;
    background-color: #bcfd2e;
    color: #1a1a1a;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    display: inline-block;
    border: 0;
    text-decoration: none;
    cursor: pointer;
    box-sizing: border-box;
  }
</style>
