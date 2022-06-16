<script lang="ts">
  import FieldDelete from '@src/components/Layout/Icons/field-delete.svg';

  export let deleteField: () => void;
</script>

<button class="field_delete" on:click={deleteField}>
  <FieldDelete />
</button>

<style>
  .field_delete {
    width: 2rem;
    height: 2rem;
    margin-top: -0.25rem;
    margin-left: 0.5rem;
    flex: 0 0 auto;
    max-width: 100%;
    display: inline-block;
    cursor: pointer;
    text-decoration: underline;
    background-color: transparent;
    outline: none;
    border: none;
    padding: 0;
    position: relative;
  }

  .field_delete:hover {
    background-color: #000;
    outline: 0;
  }

  .field_delete > :global(svg) {
    width: 2rem;
    height: 2rem;
    opacity: 0.67;
  }
</style>
