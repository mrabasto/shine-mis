<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { ContainerGap, ContainerPadding } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import SidebarItem from './JoySidebarItem.svelte'
	let clazz = ''
	export { clazz as class }

	$: sidebarClass = `min-w-[80px] h-full ${clazz} bg-white shrink-0`
</script>

<JoyContainer
	tag="aside"
	class={sidebarClass}
	alignItems={AlignItems.CENTER}
	gap={ContainerGap.NONE}
	padding={ContainerPadding.NONE}
	col
>
	<slot {SidebarItem} />
</JoyContainer>
