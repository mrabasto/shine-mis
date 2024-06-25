<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
</script>

<div id="shell" class="relative overflow-hidden">
	<JoyContainer col class="w-screen h-[100vh] overflow-hidden">
		<slot />
	</JoyContainer>
</div>
