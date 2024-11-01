<script lang="ts">
	import { run, createBubbler } from 'svelte/legacy'

	const bubble = createBubbler()
	import { BadgeButtonSize, BadgeButtonVariant } from './types'

	interface Props {
		label?: string | undefined
		size?: BadgeButtonSize
		variant?: BadgeButtonVariant
		plain?: boolean
		outline?: boolean
		type?: 'submit' | 'reset' | 'button'
		disabled?: boolean
		class?: string
		children?: import('svelte').Snippet
	}

	let {
		label = undefined,
		size = BadgeButtonSize.MD,
		variant = BadgeButtonVariant.NEUTRAL,
		plain = false,
		outline = false,
		type = 'button',
		disabled = false,
		class: clazz = '',
		children,
	}: Props = $props()

	let btnClass
	run(() => {
		btnClass = `${!plain && 'badge'} ${outline && 'badge-outline'} ${variant} ${size} ${clazz}`
	})
	run(() => {
		switch (variant) {
			case BadgeButtonVariant.GHOST:
				btnClass = `${btnClass} hover:bg-blue-50`
				break
		}
	})

	function nodeType(node: HTMLButtonElement) {
		node.type = type
	}
</script>

<button class={btnClass} onclick={bubble('click')} use:nodeType {disabled}>
	{@render children?.()}
	{#if label}
		{label}
	{/if}
</button>
