<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation'
	import { page } from '$app/stores'
	import JoySidebar from '$lib/components/Advanced/Sidebar/JoySidebar.svelte'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import type { IconName } from '$lib/components/Base/Icon/types'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { spin, type SpinAnimationOptions } from '$lib/composables/useAnimations'
	import { activeRoute, type Route } from '$lib/routes'
	import { attendanceRoutes } from '$lib/routes/attendance'
	import { ContainerGap, ContainerPadding } from '$lib/types'
	import { tick } from 'svelte'
	import { cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'

	afterNavigate(() => {
		const [route] = $attendanceRoutes.filter((r) => r.path === $page.route.id)
		$activeRoute = route
		$attendanceRoutes = $attendanceRoutes
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

	const animationDuration = 500
	const sidebarWidth = tweened(300, {
		duration: animationDuration,
		easing: cubicOut,
	})

	let isOpen = true

	const toggleSidebar = () => {
		isOpen ? sidebarWidth.set(0) : sidebarWidth.set(300)
		return (isOpen = !isOpen)
	}

	$: sidebar = `width: ${$sidebarWidth}px`
	$: spinAnimation = {
		duration: animationDuration,
		direction: 'right',
	} as SpinAnimationOptions
	$: handlerIcon = 'nav-arrow-left' as IconName | UnplugIconName
</script>

<JoyContainer gap={ContainerGap.NONE} class="w-full h-full">
	<div style={sidebar} class="h-full relative">
		<div style={sidebar} class="overflow-x-hidden h-full border-r border-base-200">
			<JoyButton
				plain
				on:click={toggleSidebar}
				class="absolute -right-9 top-1/2 -translate-y-1/2 h-[100px] w-8 rounded-r-lg
				 shadow-xl border bg-white/75 
				 backdrop-blur-sm z-10 grid place-items-center"
			>
				{#key isOpen}
					<div
						class="inset-0 grid place-items-center"
						in:spin={spinAnimation}
						on:introend={() =>
							(handlerIcon = isOpen ? 'nav-arrow-left' : 'nav-arrow-right')}
					>
						<JoyIcon icon={handlerIcon} />
					</div>
				{/key}
			</JoyButton>

			<JoySidebar let:SidebarItem class="w-[300px]">
				{#each $attendanceRoutes as route (route.path)}
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
		</div>
	</div>

	<JoyContainer class="grow h-full overflow-hidden relative">
		<JoyContainer
			col
			class="overflow-y-auto w-full h-full relative flex-none"
			padding={ContainerPadding.MD}
		>
			<slot />
		</JoyContainer>
	</JoyContainer>
</JoyContainer>
