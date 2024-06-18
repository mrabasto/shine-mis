<script lang="ts">
	import JoySidebar from '$lib/components/Advanced/Sidebar/JoySidebar.svelte'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
</script>

<JoyContainer class="w-full h-full overflow-x-auto overflow-y-hidden">
	<JoySidebar let:SidebarItem>
		<SidebarItem icon="crown-circle" />
		<SidebarItem icon="money-square" />
		<SidebarItem icon="settings" class="mt-auto" />
	</JoySidebar>
</JoyContainer>
