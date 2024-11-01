<script lang="ts">
	import { Justify } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import { Border, BorderColor } from '$lib/types/Border'
	import { ContainerGap } from '$lib/types/Gap'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import { Shadow } from '$lib/types/Shadow'

	interface Props {
		class?: string
		padding?: ContainerPadding
		gap?: ContainerGap
		rounded?: BorderRounded
		border?: Border
		borderColor?: BorderColor
		shadow?: Shadow
		justify?: Justify
		alignItems?: AlignItems
		col?: boolean
		// eslint-disable-next-line no-undef
		tag?: keyof HTMLElementTagNameMap
		children?: import('svelte').Snippet
	}

	let {
		class: clazz = '',
		padding = ContainerPadding.NONE,
		gap = ContainerGap.XS,
		rounded = BorderRounded.NONE,
		border = Border.NONE,
		borderColor = BorderColor.BASE_300,
		shadow = Shadow.NONE,
		justify = Justify.START,
		alignItems = AlignItems.START,
		col = false,
		tag = 'div',
		children,
	}: Props = $props()

	let divClass =
		$derived(`flex ${col && 'flex-col'} ${justify} ${alignItems} ${padding} ${gap}
			${border} ${borderColor} ${rounded} ${shadow} ${clazz}`)
</script>

<svelte:element this={tag} class={divClass}>
	{@render children?.()}
</svelte:element>
