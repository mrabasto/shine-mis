<script lang="ts">
	import { run } from 'svelte/legacy'

	import { ContainerGap } from '$lib/types/Gap'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import { Shadow } from '$lib/types/Shadow'

	interface Props {
		class?: string
		padding?: ContainerPadding
		gap?: ContainerGap
		rounded?: BorderRounded
		shadow?: Shadow
		children?: import('svelte').Snippet
	}

	let {
		class: clazz = '',
		padding = ContainerPadding.NONE,
		gap = ContainerGap.XS,
		rounded = BorderRounded.NONE,
		shadow = Shadow.NONE,
		children,
	}: Props = $props()

	let divClass = $state('flex ')
	run(() => {
		divClass = `${divClass} ${padding} ${gap} ${rounded} ${shadow} ${clazz}`
	})
</script>

<div class={divClass}>
	{@render children?.()}
</div>
