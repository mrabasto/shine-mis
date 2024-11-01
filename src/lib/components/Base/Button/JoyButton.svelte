<script lang="ts">
	import { ButtonSize, ButtonVariant } from './types'
	interface Props {
		label?: string | undefined
		size?: ButtonSize
		variant?: ButtonVariant
		plain?: boolean
		outline?: boolean
		type?: 'submit' | 'reset' | 'button'
		disabled?: boolean
		noAnimation?: boolean
		class?: string
		children?: import('svelte').Snippet
		onclick?: (event: MouseEvent) => void
	}

	let {
		label = undefined,
		size = ButtonSize.SM,
		variant = ButtonVariant.NEUTRAL,
		plain = false,
		outline = false,
		type = 'button',
		disabled = $bindable(false),
		noAnimation = true,
		class: clazz = '',
		children,
		onclick,
	}: Props = $props()

	let btnClass = $derived(
		!plain
			? `btn outline-none ${outline && 'btn-outline'} ${variant} ${size} ${clazz}
				${noAnimation && 'no-animation'}`
			: clazz
	)

	function nodeType(node: HTMLButtonElement) {
		node.type = type
	}
</script>

<button class={btnClass} {onclick} use:nodeType {disabled}>
	{@render children?.()}
	{#if label}
		{label}
	{/if}
</button>
