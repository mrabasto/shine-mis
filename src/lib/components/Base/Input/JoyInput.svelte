<script lang="ts">
	import { BorderRounded } from '$lib/types/Round'
	import { uid } from 'radash'
	import { InputSize, InputVariant } from './types'
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements'
	import type { Snippet } from 'svelte'

	interface Props {
		attributes?: HTMLInputAttributes
		placeholder: string
		size?: InputSize
		variant?: InputVariant
		bordered?: boolean
		value?: string | number
		name?: string
		rounded?: BorderRounded
		type?: HTMLInputTypeAttribute
		id?: string
		labeledL?: Snippet
		labeledR?: Snippet
		class: string
	}

	let {
		attributes = $bindable(),
		placeholder = 'Type here',
		size = InputSize.MD,
		variant = InputVariant.NEUTRAL,
		bordered = false,
		value = $bindable(),
		name,
		rounded = BorderRounded.MD,
		type = 'text',
		id = uid(10),
		labeledL,
		labeledR,
		class: clazz,
	}: Props = $props()

	let inputId = $derived(`input-${id}`)
	let inputClass = $derived(
		`input focus-within:outline-none focus-within:border-primary focus-within:border-2 transition-colors duration-200
			${variant} ${size} ${rounded} ${bordered && 'input-bordred border-2'} ${clazz}`
	)

	export { clazz as class }

	const nodeType = (node: HTMLInputElement) => {
		node.type = type
	}

	const nodeId = (node: HTMLInputElement) => {
		node.id = inputId
	}
</script>

{#if labeledL || labeledR}
	<label class={`${inputClass} flex items-center gap-2`}>
		{@render labeledL?.()}
		<input
			use:nodeId
			use:nodeType
			{name}
			{placeholder}
			bind:value
			{...attributes}
			class="grow"
		/>
		{@render labeledR?.()}
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
