<script lang="ts">
	import { Justify } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import { Border, BorderColor } from '$lib/types/Border'
	import { ContainerGap } from '$lib/types/Gap'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import { Shadow } from '$lib/types/Shadow'

	let clazz: string = ''

	export let padding: ContainerPadding = ContainerPadding.NONE
	export let gap: ContainerGap = ContainerGap.XS
	export let rounded: BorderRounded = BorderRounded.NONE
	export let border: Border = Border.NONE
	export let borderColor: BorderColor = BorderColor.BASE_300
	export let shadow: Shadow = Shadow.NONE
	export let justify: Justify = Justify.START
	export let alignItems: AlignItems = AlignItems.START
	export let col = false
	export let tag: keyof HTMLElementTagNameMap = 'div'

	export { clazz as class }

	let divClass = 'flex '
	$: {
		if (col) {
			divClass += 'flex-col'
		}

		divClass = `${divClass} ${justify} ${alignItems} ${padding} ${gap} 
			${border} ${borderColor} ${rounded} ${shadow} ${clazz}`
	}
</script>

<svelte:element this={tag} class={divClass}>
	<slot />
</svelte:element>
