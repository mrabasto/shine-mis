<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
</script>

<div id="shell" class="relative">
	<JoyContainer col class="w-screen h-[100vh] bg-base-100 overflow-hidden">
		<slot />
	</JoyContainer>
</div>
