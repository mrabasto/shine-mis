<script lang="ts">
	import JoyFloater from '$lib/components/Advanced/Floater/JoyFloater.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import {
		Border,
		BorderRounded,
		ContainerGap,
		ContainerPadding,
		Shadow,
	} from '$lib/types'
	import { hide, type Placement } from '@floating-ui/dom'
	let clazz = ''
	export { clazz as class }
	export let placement: Placement = 'top-end'
	export let fitSize = false
</script>

<JoyFloater class={clazz} {placement} {fitSize}>
	<slot slot="floater-target" let:show name="context-target" showContextMenu={show} />
	<JoyContainer
		slot="floater-contents"
		let:hide
		col
		gap={ContainerGap.XXS}
		rounded={BorderRounded.LG}
		padding={ContainerPadding.NONE}
		class="bg-white p-2 min-w-[200px] max-w-full"
		shadow={Shadow.XL}
	>
		<slot name="context-contents" hideContextMenu={hide} />
	</JoyContainer>
</JoyFloater>
