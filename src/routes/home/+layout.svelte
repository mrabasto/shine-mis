<script lang="ts">
	import JoyIconButton from '$lib/components/Advanced/Button/JoyIconButton.svelte'
	import JoyContextMenu from '$lib/components/Advanced/ContextMenu/JoyContextMenu.svelte'
	import JoySidebar from '$lib/components/Advanced/Sidebar/JoySidebar.svelte'
	import JoyTooltip from '$lib/components/Advanced/Tooltip/JoyTooltip.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
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
				icon="hambuger-menu-line-duotone"
				let:show
				on:click={show}
				slot="context-target"
			/>
			<svelte:fragment slot="context-contents">
				<JoyIconButton
					variant={ButtonVariant.GHOST}
					size={ButtonSize.MD}
					class="w-full justify-start"
					on:click={signOut}
					icon="exit-outline"
				>
					Sign out
				</JoyIconButton>
			</svelte:fragment>
		</JoyContextMenu>
	</JoySidebar>

	<JoyContainer class="w-full h-full overflow-y-auto" padding={ContainerPadding.NONE}>
		<slot />
	</JoyContainer>
</JoyContainer>
