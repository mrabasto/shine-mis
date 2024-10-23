<script lang="ts">
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button/types'
	import type { HTMLAnchorAttributes } from 'svelte/elements'
	export let attributes: HTMLAnchorAttributes | undefined = undefined

	export let label: string | undefined = undefined
	export let size: ButtonSize | undefined = undefined
	export let variant: ButtonVariant | undefined = undefined
	export let plain: boolean = false
	export let outline: boolean = false
	let clazz = ''
	export let href = '#'
	export { clazz as class }

	$: btnClass = `${!plain && 'btn'} ${outline && 'btn-outline'} ${size} ${variant} ${clazz}`

	$: {
		switch (variant) {
			case ButtonVariant.GHOST:
				btnClass = `${btnClass} hover:bg-blue-50`
				break
		}
	}
</script>

<a class={btnClass} {href} {...attributes}>
	<slot />
	{#if label}
		{label}
	{/if}
</a>
