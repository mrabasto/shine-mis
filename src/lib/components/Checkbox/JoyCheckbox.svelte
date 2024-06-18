<script lang="ts">
	import { CheckboxSize, CheckboxVariant } from './types'

	export let label: string = 'Checkbox label'
	export let size: CheckboxSize = CheckboxSize.SM
	export let variant: CheckboxVariant | undefined = undefined
	export let formControl: boolean = true

	let controlWidthClass: string = 'w-52'

	export { controlWidthClass as class }

	$: checkboxClass = `checkbox ${variant} ${size}`
</script>

{#if formControl}
	<div class={`form-control ${controlWidthClass}`}>
		<label class="cursor-pointer label">
			<span class="label-text">{label}</span>
			<input type="checkbox" class={checkboxClass} />
		</label>
	</div>
{:else}
	<input type="checkbox" class={checkboxClass} />
{/if}
