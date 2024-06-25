<script>
	import JoyFloater from '$lib/components/Advanced/Floater/JoyFloater.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import {
		Border,
		BorderRounded,
		ContainerGap,
		ContainerPadding,
		Shadow,
	} from '$lib/types'
	let clazz = ''
	export { clazz as class }
</script>

<JoyFloater class={clazz} placement="top-end">
	<slot slot="floater-target" let:show name="context-target" {show} />
	<JoyContainer
		slot="floater-contents"
		col
		gap={ContainerGap.XXS}
		rounded={BorderRounded.LG}
		padding={ContainerPadding.NONE}
		class="bg-white p-2 min-w-[200px]"
		shadow={Shadow.XL}
		border={Border.XXS}
	>
		<slot name="context-contents" />
	</JoyContainer>
</JoyFloater>
