<script lang="ts">
  import SelectorAttribute from './SelectorAttribute.svelte';
  import SelectorValueWrapper from './SelectorValueWrapper.svelte';
  import SelectorButton from './SelectorButton.svelte';
  import SelectorValue from './SelectorValue.svelte';
  import SelectorFields from './SelectorFields.svelte';
  import type { AttributeValue } from '$global/types/schema';

  export let label: 'Name' | 'Value';

  export let option: string;
  export let isActive: boolean;

  export let valueType: AttributeValue | AttributeValue[];
</script>

<SelectorAttribute>
  {label}
</SelectorAttribute>
<SelectorValueWrapper>
  <SelectorValue>
    <SelectorFields on:change {isActive} id="selector" value={valueType} bind:option />
  </SelectorValue>
  <SelectorButton selector={option} top={Array.isArray(option)} />
</SelectorValueWrapper>
