<script lang="ts">
	import JoyIconButton from '$lib/components/Advanced/Button/JoyIconButton.svelte'
	import JoyContextMenu from '$lib/components/Advanced/ContextMenu/JoyContextMenu.svelte'
	import JoySidebar from '$lib/components/Advanced/Sidebar/JoySidebar.svelte'
	import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types.js'
	import JoyTooltip from '$lib/components/Advanced/Tooltip/JoyTooltip.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { App } from '$lib/modules/app'
	import { authStore, signOut, user, type User } from '$lib/modules/authentication'
	import { getUserRoles } from '$lib/modules/user-roles/services'
	import { currentUserRoles } from '$lib/modules/user-roles/stores'
	import { routes } from '$lib/routes'
	import { ContainerGap, ContainerPadding } from '$lib/types'
	import { tryit } from 'radash'
	import { onMount } from 'svelte'
	import { createAvatar } from '@dicebear/core'
	import { thumbs } from '@dicebear/collection'
	import { userService } from '$lib/modules/users'
	const { loadUsers } = userService()

	export let data
	let toast: JoyToast
	let avatar: string

	onMount(async () => {
		$authStore = data.auth
		$user = data.auth.model as User

		avatar = createAvatar(thumbs, {
			seed: $user.name,
			size: 200,
		}).toDataUri()

		App.isLoading.set(true)

		const [err, userRole] = await tryit(getUserRoles)($user)

		App.isLoading.set(false)

		if (err) {
			return toast.fire({
				message: 'Failed to retrieve user roles',
				variant: ToastVariant.ERROR,
			})
		}

		if (userRole.expand?.role_id) {
			$currentUserRoles = userRole.expand.role_id
		}

		const loadUserError = await loadUsers()

		if (loadUserError) {
			toast.fire({
				message: 'Failed to retrieve users',
				variant: ToastVariant.ERROR,
			})
		}
	})
</script>

<JoyContainer class="w-full h-full overflow-hidden" gap={ContainerGap.NONE}>
	<JoyToast bind:this={toast} target="shell" />
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

		<JoyContainer
			gap={ContainerGap.NONE}
			padding={ContainerPadding.NONE}
			col
			class="mt-auto w-full"
		>
			<JoyTooltip label="Profile" class="hover:bg-secondary/25 hover:text-primary w-full">
				<SidebarItem type="container" class="max-w-[5rem] max-h-[4rem]">
					<img class="rounded-full w-full h-full" src={avatar} alt="user-avatar" />
				</SidebarItem>
			</JoyTooltip>

			<JoyContextMenu class="hover:bg-secondary/25 hover:text-primary w-full">
				<SidebarItem
					type="button"
					icon="hambuger-menu-line-duotone"
					let:showContextMenu
					on:click={showContextMenu}
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
		</JoyContainer>
	</JoySidebar>

	<JoyContainer class="w-full h-full overflow-y-auto" padding={ContainerPadding.NONE}>
		<slot />
	</JoyContainer>
</JoyContainer>
