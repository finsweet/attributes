<script lang="ts">
  import { resetInputForm } from '@src/services/Attributes/AttributesService';
  import { scrollTo } from '@src/services/DOM/Utils/Utils';

  import {
    schemaForm,
    schemaData,
    VALIDATE_MODES,
    validatingMode,
    schemaSettingsInstance,
    schemaSettingsKey,
    isSubmitted,
    appError,
  } from '@src/stores';

  function clearForm() {
    $appError = false;

    $validatingMode = VALIDATE_MODES.VALIDATING;

    const schemaSettings = {
      key: $schemaSettingsKey || '',
      instance: $schemaSettingsInstance,
    };

    $schemaForm = resetInputForm($schemaForm, $schemaData, schemaSettings);

    scrollTo('#support-internal', 100);

    setTimeout(function () {
      $validatingMode = VALIDATE_MODES.READY;
    }, 1000);

    $isSubmitted = false;
  }
</script>

<button on:click={clearForm} data-testid="reset"> Reset </button>

<style>
  button {
    display: block;
    position: relative;
    left: 0%;
    top: auto;
    right: 0%;
    bottom: 0%;
    z-index: 99;
    width: 100%;
    max-width: 10rem;
    margin-right: 1rem;
    padding: 0.75rem 2rem;
    background-color: #111;
    color: #9b9b9b;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    outline: none;
    border: 0;
    cursor: pointer;
  }
</style>
