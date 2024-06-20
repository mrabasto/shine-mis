<script lang="ts">
	import { FontWeight, TextColor, TextSize, TextTag } from './types'

	let clazz = ''
	export { clazz as class }
	export let tag: TextTag = TextTag.SPAN
	export let color: TextColor = TextColor.GRAY_800
	export let weight: FontWeight = FontWeight.NORMAL
	export let size: TextSize = TextSize.BASE
	export let italicize = false

	$: textClass = `${color} ${weight} ${size} ${italicize && 'italic'} ${clazz}`
</script>

<svelte:element this={tag} class={textClass}>
	<slot />
</svelte:element>
