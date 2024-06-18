<script lang="ts">
	import { BadgeButtonSize, BadgeButtonVariant } from './types'

	export let label: string | undefined = undefined
	export let size: BadgeButtonSize = BadgeButtonSize.MD
	export let variant: BadgeButtonVariant = BadgeButtonVariant.NEUTRAL
	export let plain: boolean = false
	export let outline: boolean = false
	export let type: 'submit' | 'reset' | 'button' = 'button'
	export let disabled: boolean = false
	let clazz = ''
	export { clazz as class }

	$: btnClass = `${!plain && 'badge'} ${outline && 'badge-outline'} ${variant} ${size} ${clazz}`
	$: {
		switch (variant) {
			case BadgeButtonVariant.GHOST:
				btnClass = `${btnClass} hover:bg-blue-50`
				break
		}
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
