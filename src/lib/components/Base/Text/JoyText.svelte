<script lang="ts">
	import {
		FontWeight,
		TextColor,
		TextSize,
		TextTag,
		type FontWeightValues,
		type TextColorValues,
		type TextSizeValues,
		type TextTagValues,
	} from './types'

	interface Props {
		class?: string
		tag?: TextTagValues
		color?: TextColorValues
		weight?: FontWeightValues
		size?: TextSizeValues
		italicize?: boolean
		children?: import('svelte').Snippet
	}

	let {
		class: clazz = '',
		tag = TextTag.SPAN,
		color = TextColor.INHERIT,
		weight = FontWeight.NORMAL,
		size = TextSize.BASE,
		italicize = false,
		children,
	}: Props = $props()

	let textClass = $derived(`${color} ${weight} ${size} ${italicize && 'italic'} ${clazz}`)
</script>

<svelte:element this={tag} class={textClass}>
	{@render children?.()}
</svelte:element>
