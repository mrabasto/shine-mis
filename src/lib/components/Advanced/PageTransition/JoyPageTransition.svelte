<script lang="ts">
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition'
	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()
</script>

{#key $page.url.pathname}
	<div in:fade={{ duration: 500 }} class="inset-0 absolute bg-primary">
		{@render children?.()}
	</div>
{/key}
