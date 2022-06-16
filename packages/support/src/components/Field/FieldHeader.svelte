<script type="ts">
  import Header from '@src/components/Layout/Header.svelte';
  import AttributeFieldAdd from '@src/components/Field/FieldAdd.svelte';
  import AttributeFieldDel from '@src/components/Field/FieldDel.svelte';
  import AttributeFieldToggle from '@src/components/Field/FieldToggle.svelte';
  import type { SchemaInputField } from '@src/types/Input.types';

  export let isOpen: boolean;
  export let fieldInput: SchemaInputField;
  export let deleteField: (fieldIndex: string) => void;
  export let addField: (event: Event) => void;
  export let toggleFields: (fieldIndex: string | null) => void;

  function toggle() {
    if (isOpen) {
      toggleFields(null);
      return;
    }

    toggleFields(fieldInput.index);
  }
</script>

<div class="field_header" on:click={toggle}>
  <Header>
    <div class="field_identifier">
      {fieldInput.field.toLocaleUpperCase()}: {(fieldInput && fieldInput.identifier) || `{Value}`}
    </div>
    <div class="field_actions">
      <AttributeFieldToggle {isOpen} />
      <AttributeFieldAdd {addField} />
      {#if fieldInput && fieldInput.index !== 'field-1'}
        <AttributeFieldDel deleteField={() => deleteField((fieldInput && fieldInput.index) || '')} />
      {/if}
    </div>
  </Header>
</div>

<style>
  .field_identifier {
    background-color: #1a1a1a;
    color: #fff;
    font-weight: 400;
    line-height: 1.5;
    height: 1.5rem;
  }

  .field_actions {
    display: flex;
    height: 1.5rem;
  }

  .field_header {
    cursor: pointer;
  }
</style>
