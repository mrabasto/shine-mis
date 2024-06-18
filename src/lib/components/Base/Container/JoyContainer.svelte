<script lang="ts">
	import { Border, BorderColor } from '$lib/types/Border'
	import { ContainerGap } from '$lib/types/Gap'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import { Shadow } from '$lib/types/Shadow'

	let clazz: string = ''

	export let padding: ContainerPadding = ContainerPadding.XS
	export let gap: ContainerGap = ContainerGap.XS
	export let rounded: BorderRounded = BorderRounded.NONE
	export let border: Border = Border.NONE
	export let borderColor: BorderColor = BorderColor.BASE_300
	export let shadow: Shadow = Shadow.NONE
	export let col = false

	export { clazz as class }

	let divClass = 'flex '
	$: {
		if (col) {
			divClass += 'flex-col'
		}

		divClass = `${divClass} ${padding} ${gap} ${border} ${borderColor} 
			${rounded} ${shadow} ${clazz}`
	}
</script>

<div class={divClass}>
	<slot />
</div>
