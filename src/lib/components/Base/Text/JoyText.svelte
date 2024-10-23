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

	let clazz = ''
	export { clazz as class }
	export let tag: TextTagValues = TextTag.SPAN
	export let color: TextColorValues = TextColor.INHERIT
	export let weight: FontWeightValues = FontWeight.NORMAL
	export let size: TextSizeValues = TextSize.BASE
	export let italicize = false

	$: textClass = `${color} ${weight} ${size} ${italicize && 'italic'} ${clazz}`
</script>

<svelte:element this={tag} class={textClass}>
	<slot />
</svelte:element>
