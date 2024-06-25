<script lang="ts">
	import { BorderRounded } from '$lib/types/Round'
	import { uid } from 'radash'
	import { InputSize, InputVariant } from './types'
	import type { HTMLInputAttributes } from 'svelte/elements'

	interface Attributes extends HTMLInputAttributes {}
	export let attributes: Attributes | undefined = undefined

	export let placeholder: string = 'Type here'
	export let size: InputSize = InputSize.MD
	export let variant: InputVariant = InputVariant.NEUTRAL
	export let bordered = false
	export let value: string | number | undefined = undefined
	export let name: string | undefined = undefined
	export let rounded: BorderRounded = BorderRounded.MD

	let clazz = ''
	export let type: string = 'text'
	export let id: string = uid(10)
	let inputClass = ''
	export { clazz as class }

	$: {
		let buildClass = ''

		if (bordered) {
			buildClass += ' input-bordered border-2'
		}

		inputClass = `input focus-within:outline-none focus-within:border-accent
			${variant} ${size} ${rounded} ${buildClass} ${clazz}`
	}

	$: id = `input-${id}`

	const nodeType = (node: HTMLInputElement) => {
		node.type = type
	}

	const nodeId = (node: HTMLInputElement) => {
		node.id = id
	}
</script>

{#if $$slots['labeled-l'] || $$slots['labeled-r']}
	<label class={`${inputClass} flex items-center gap-2`}>
		<slot name="labeled-l" />
		<input
			use:nodeId
			use:nodeType
			{name}
			{placeholder}
			bind:value
			{...attributes}
			class="grow"
		/>
		<slot name="labeled-r" />
	</label>
{:else}
	<input
		use:nodeId
		use:nodeType
		{name}
		{placeholder}
		class={inputClass}
		bind:value
		{...attributes}
	/>
{/if}
