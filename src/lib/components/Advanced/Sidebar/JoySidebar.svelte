<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { ContainerGap } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import SidebarItem from './JoySidebarItem.svelte'
	let clazz = ''
	export { clazz as class }

	$: sidebarClass = `min-w-[80px] h-full ${clazz} bg-white`
</script>

<JoyContainer
	tag="aside"
	class={sidebarClass}
	alignItems={AlignItems.CENTER}
	gap={ContainerGap.NONE}
	col
>
	<slot {SidebarItem} />
</JoyContainer>
