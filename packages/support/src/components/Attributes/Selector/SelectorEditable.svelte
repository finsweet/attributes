<script lang="ts">
  import SelectorAttribute from './SelectorAttribute.svelte';
  import SelectorValueWrapper from './SelectorValueWrapper.svelte';
  import SelectorButton from './SelectorButton.svelte';
  import SelectorValue from './SelectorValue.svelte';
  import SelectorFields from './SelectorFields.svelte';
  import type { AttributeSettingValuePrimitive, AttributeSettingValueOptions } from '@global/types/schema';

  export let label: 'Name' | 'Value';

  export let option: string;
  export let isActive: boolean;

  export let valueType: AttributeSettingValueOptions | AttributeSettingValuePrimitive;
</script>

<SelectorAttribute>
  {label}
</SelectorAttribute>
<SelectorValueWrapper>
  <SelectorValue>
    <SelectorFields on:change {isActive} id="selector" value={valueType} {option} />
  </SelectorValue>
  <SelectorButton selector={option} />
</SelectorValueWrapper>
