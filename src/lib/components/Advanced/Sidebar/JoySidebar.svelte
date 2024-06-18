<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { Size } from '$lib/components/Base/Icon/types'
	import { ContainerPadding } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import SidebarItem from './JoySidebarItem.svelte'
</script>

<JoyContainer
	tag="aside"
	class="w-[80px] bg-base-100 h-full border-r"
	alignItems={AlignItems.CENTER}
	col
	padding={ContainerPadding.XXS}
>
	<slot {SidebarItem} />
</JoyContainer>
