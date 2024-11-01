<script lang="ts">
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button/types'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { Size } from '$lib/components/Base/Icon/types'

	interface Props {
		icon?: UnplugIconName
		label?: string | undefined
		size?: ButtonSize
		variant?: ButtonVariant
		plain?: boolean
		outline?: boolean
		type?: 'submit' | 'reset' | 'button'
		disabled?: boolean
		noAnimation?: boolean
		class?: string
		iconSize?: Size
		iconClass?: string
		children?: import('svelte').Snippet
		onclick?: (event: MouseEvent) => void
	}

	let {
		icon = 'crown-circle',
		label = undefined,
		size = ButtonSize.SM,
		variant = ButtonVariant.NEUTRAL,
		plain = false,
		outline = false,
		type = 'button',
		disabled = false,
		noAnimation = true,
		class: clazz = '',
		iconSize = Size.SM,
		iconClass = '',
		children,
		onclick,
	}: Props = $props()

	let btnClass = $derived(
		!plain &&
			`btn ${outline && 'btn-outline'} ${variant} ${size} ${clazz}
				${noAnimation && 'no-animation'} gap-2 items-center`
	)

	function nodeType(node: HTMLButtonElement) {
		node.type = type
	}
</script>

<button class={String(btnClass)} {onclick} use:nodeType {disabled}>
	<JoyIcon {icon} size={iconSize} class={iconClass} />
	{@render children?.()}
	{#if label}
		{label}
	{/if}
</button>
