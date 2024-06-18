<script lang="ts">
	import JoyAnchor from '$lib/components/Base/Anchor/JoyAnchor.svelte'
	import { ButtonVariant } from '$lib/components/Base/Button/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { ContainerGap } from '$lib/types/Gap'
	import { BorderRounded } from '$lib/types/Round'
	import type { SidebarLinks } from './types'

	export let links: Array<SidebarLinks> = []
</script>

<JoyContainer
	col
	class="h-full max-h-full overflow-auto w-1/6 rounded-r-none border-r-2 bg-gray-100"
	rounded={BorderRounded.MD}
	gap={ContainerGap.XXS}
>
	{#each links as link}
		<JoyAnchor
			variant={ButtonVariant.GHOST}
			label={link.label}
			class="justify-start font-normal"
			href={link.href}
		>
			<JoyIcon icon={link.icon} fill={link.iconFill} />
		</JoyAnchor>
	{/each}
</JoyContainer>
