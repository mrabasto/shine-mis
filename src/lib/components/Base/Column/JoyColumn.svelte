<script lang="ts">
	import { ContainerGap } from '$lib/types/Gap'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import { Shadow } from '$lib/types/Shadow'

	let clazz: string = ''

	export let padding: ContainerPadding = ContainerPadding.NONE
	export let gap: ContainerGap = ContainerGap.XS
	export let rounded: BorderRounded = BorderRounded.NONE
	export let shadow: Shadow = Shadow.NONE

	export { clazz as class }

	let divClass = 'flex flex-col'
	$: {
		divClass = `${divClass} ${padding} ${gap} ${rounded} ${shadow} ${clazz}`
	}
</script>

<div class={divClass}>
	<slot />
</div>
