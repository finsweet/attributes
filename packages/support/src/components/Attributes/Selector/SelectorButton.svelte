<script lang="ts">
  import CopyLogo from '@src/components/Layout/Icons/copy.svg';
  import CopiedLogo from '@src/components/Layout/Icons/copied.svg';

  export let isCopied = false;
  export let selector: string;
  export let top = false;

  let internalSelector = selector;

  async function copyToClipboard(selector: string) {
    await navigator.clipboard.writeText(selector);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 3000);
  }

  $: {
    if (selector !== internalSelector) {
      internalSelector = selector;
      isCopied = false;
    }
  }
</script>

<button on:click={() => copyToClipboard(selector)} class="copy-button" class:copied={isCopied} class:top>
  {#if isCopied}
    <CopiedLogo />
  {:else}
    <CopyLogo />
  {/if}
</button>

<style>
  .copy-button {
    padding-right: 0.4rem;
    padding-bottom: 0.15rem;
    padding-left: 0.4rem;
    border-radius: 6px;
    background-color: #bcfd2e;
    color: #111;
    font-size: 1.125rem;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    max-width: 100%;
    display: inline-block;
    outline: none;
    border: none;
    height: 30px;
    cursor: pointer;
    width: 2rem;
    min-width: 2rem;
    box-sizing: border-box;
  }

  .copy-button {
    align-self: flex-start;
  }

  .copy-button:hover {
    background-color: #eaffbb;
  }

  .copy-button.copied,
  .copy-button.copied:hover {
    background-color: rgb(151, 151, 151);
  }

  .copy-button > :global(svg) {
    width: 1.25rem;
    max-width: 100%;
    min-width: 1.25rem;
    vertical-align: middle;
    display: inline-block;
  }

  .copy-button.copied > :global(svg) {
    width: 1rem;
    max-width: 100%;
    min-width: 1rem;
    vertical-align: middle;
    display: inline-block;
  }
</style>
