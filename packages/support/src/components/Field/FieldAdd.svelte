<script lang="ts">
  import FieldAdd from '@src/components/Layout/Icons/field-add.svg';

  export let addField: (event: Event) => void;
</script>

<button class="field_add" on:click={addField} data-testid="add-field">
  <FieldAdd />
</button>

<style>
  .field_add {
    z-index: 88;
    display: flex;
    width: 2rem;
    height: 2rem;
    margin-top: -0.25rem;
    margin-left: 0.5rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
    background-color: #1a1a1a;
    max-width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    text-decoration: underline;
    outline: none;
    border: none;
  }

  .field_add:hover {
    background-color: #000;
    outline: 0;
  }

  .field_add :global(svg) {
    width: 0.8rem;
    opacity: 0.67;
  }
</style>
