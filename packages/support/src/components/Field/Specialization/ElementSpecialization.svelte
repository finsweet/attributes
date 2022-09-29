<script lang="ts">
  import Select from '@src/components/Field/Specialization/Form/Select/Select.svelte';
  import type { FieldChangeSpecialization, SchemaInputField } from '@src/types/Input.types';
  import type { FieldSpecialization } from '$global/types/schema';

  export let changeFieldElement: FieldChangeSpecialization;
  export let fieldInput: SchemaInputField;

  export let specializations: FieldSpecialization[];
</script>

<div>Element</div>
<Select options={specializations} {changeFieldElement} {fieldInput} />
