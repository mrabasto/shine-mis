<script lang="ts">
	import JoySidebar from '$lib/components/Advanced/Sidebar/JoySidebar.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { signOut } from '$lib/modules/authentication'
	import { routes } from '$lib/routes'
	import { ContainerGap, ContainerPadding } from '$lib/types'
</script>

<JoyContainer
	class="w-full h-full overflow-x-auto overflow-y-hidden"
	gap={ContainerGap.NONE}
>
	<JoySidebar let:SidebarItem class="border-r">
		{#each $routes as route (route.path)}
			{#if route.isShown}
				<SidebarItem
					icon={route.icon}
					href={route.path}
					class="hover:bg-secondary/25 hover:text-primary"
				/>
			{/if}
		{/each}
		<SidebarItem icon="settings" class="mt-auto" />
		<SidebarItem icon="exit-outline" on:click={signOut} />
	</JoySidebar>

	<JoyContainer class="w-full h-full overflow-y-auto" padding={ContainerPadding.NONE}>
		<slot />
	</JoyContainer>
</JoyContainer>
