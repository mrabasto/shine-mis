<script lang="ts">
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition'
</script>

{#key $page.url.pathname}
	<div in:fade={{ duration: 500 }} class="inset-0 absolute bg-primary">
		<slot />
	</div>
{/key}
