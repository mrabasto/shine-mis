<script lang="ts">
	import { ButtonSize, ButtonVariant } from './types'
	export let label: string | undefined = undefined
	export let size: ButtonSize = ButtonSize.SM
	export let variant: ButtonVariant = ButtonVariant.NEUTRAL
	export let plain: boolean = false
	export let outline: boolean = false
	export let type: 'submit' | 'reset' | 'button' = 'button'
	export let disabled: boolean = false
	export let noAnimation: boolean = true
	let clazz = ''
	export { clazz as class }
	let btnClass = ''

	$: if (!plain) {
		btnClass = `btn ${outline && 'btn-outline'} ${variant} ${size} ${clazz} 
			${noAnimation && 'no-animation'}`
	} else {
		btnClass = clazz
	}

	function nodeType(node: HTMLButtonElement) {
		node.type = type
	}
</script>

<button class={btnClass} on:click use:nodeType {disabled}>
	<slot />
	{#if label}
		{label}
	{/if}
</button>
