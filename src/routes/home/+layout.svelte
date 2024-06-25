<script lang="ts">
	import JoyContextMenu from '$lib/components/Advanced/ContextMenu/JoyContextMenu.svelte'
	import JoyFloater from '$lib/components/Advanced/Floater/JoyFloater.svelte'
	import JoySidebar from '$lib/components/Advanced/Sidebar/JoySidebar.svelte'
	import JoyTooltip from '$lib/components/Advanced/Tooltip/JoyTooltip.svelte'
	import { ButtonVariant } from '$lib/components/Base/Button'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
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
				<JoyTooltip
					label={route.label}
					class="hover:bg-secondary/25 hover:text-primary w-full"
				>
					<SidebarItem icon={route.icon} href={route.path} />
				</JoyTooltip>
			{/if}
		{/each}

		<JoyContextMenu class="mt-auto hover:bg-secondary/25 hover:text-primary w-full">
			<SidebarItem
				type="button"
				icon="settings"
				let:show
				on:click={show}
				slot="context-target"
			/>
			<svelte:fragment slot="context-contents">
				<JoyButton variant={ButtonVariant.GHOST} class="w-full" on:click={signOut}
					>Sign out</JoyButton
				>
			</svelte:fragment>
		</JoyContextMenu>
	</JoySidebar>

	<JoyContainer class="w-full h-full overflow-y-auto" padding={ContainerPadding.NONE}>
		<slot />
	</JoyContainer>
</JoyContainer>
