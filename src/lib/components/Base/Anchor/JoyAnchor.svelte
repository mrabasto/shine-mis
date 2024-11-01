<script lang="ts">
	import { run } from 'svelte/legacy'

	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button/types'
	import type { HTMLAnchorAttributes } from 'svelte/elements'

	interface Props {
		attributes?: HTMLAnchorAttributes | undefined
		label?: string | undefined
		size?: ButtonSize | undefined
		variant?: ButtonVariant | undefined
		plain?: boolean
		outline?: boolean
		class?: string
		href?: string
		children?: import('svelte').Snippet
	}

	let {
		attributes = undefined,
		label = undefined,
		size = undefined,
		variant = undefined,
		plain = false,
		outline = false,
		class: clazz = '',
		href = '#',
		children,
	}: Props = $props()

	let btnClass
	run(() => {
		btnClass = `${!plain && 'btn'} ${outline && 'btn-outline'} ${size} ${variant} ${clazz}`
	})

	run(() => {
		switch (variant) {
			case ButtonVariant.GHOST:
				btnClass = `${btnClass} hover:bg-blue-50`
				break
		}
	})
</script>

<a class={btnClass} {href} {...attributes}>
	{@render children?.()}
	{#if label}
		{label}
	{/if}
</a>
