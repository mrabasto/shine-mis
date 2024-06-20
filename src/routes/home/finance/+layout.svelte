<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation'
	import { page } from '$app/stores'
	import JoySidebar from '$lib/components/Advanced/Sidebar/JoySidebar.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { activeRoute, type Route } from '$lib/routes'
	import { routes } from '$lib/routes/finance'
	import { ContainerGap, ContainerPadding } from '$lib/types'
	import { tick } from 'svelte'

	afterNavigate(() => {
		const [route] = $routes.filter((r) => r.path === $page.route.id)
		$activeRoute = route
		$routes = $routes
	})

	const setActive = async (route: Route) => {
		$activeRoute = route

		await tick()

		if ($activeRoute.path === $page.route.id) return

		goto(route.path, { replaceState: true })
	}

	const sidebarItemClass = `hover:bg-secondary/25 
		hover:text-primary`

	const itemLabelClass = `group-hover:text-primary text-gray-600`

	const activeClass = (route: Route) => {
		if (route.path !== $activeRoute?.path) return { sidebarItemClass, itemLabelClass }

		return {
			sidebarItemClass: `{$sidebarItemClass} text-primary bg-secondary/25`,
			itemLabelClass: 'text-primary',
		}
	}
</script>

<JoyContainer gap={ContainerGap.NONE} class="w-full h-full">
	<JoySidebar let:SidebarItem class="border-r w-[300px]">
		{#each $routes as route (route.path)}
			<SidebarItem
				icon={route.icon}
				class={activeClass(route).sidebarItemClass}
				on:click={() => setActive(route)}
			>
				<JoyText slot="label" class={activeClass(route).itemLabelClass}
					>{route.label}
				</JoyText>
			</SidebarItem>
		{/each}
	</JoySidebar>

	<JoyContainer class="w-full h-full overflow-hidden relative">
		<JoyContainer
			col
			class="overflow-y-auto w-full h-full relative flex-none"
			padding={ContainerPadding.MD}
		>
			<slot />
		</JoyContainer>
	</JoyContainer>
</JoyContainer>
