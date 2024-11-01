<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()
</script>

<div id="shell" class="relative overflow-hidden text-neutral">
	<JoyContainer col class="w-screen h-screen overflow-hidden relative">
		{@render children?.()}
	</JoyContainer>
</div>
