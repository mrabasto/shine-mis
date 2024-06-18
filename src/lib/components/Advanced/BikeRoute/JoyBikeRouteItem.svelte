<script lang="ts">
	import JoyAnchor from '$lib/components/Base/Anchor/JoyAnchor.svelte'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Size } from '$lib/components/Base/Icon/types'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextColor, TextSize } from '$lib/components/Base/Text/types'
	import type { BikeRouteModel } from '$lib/modules/bike-routes/types'
	import { Border } from '$lib/types/Border'
	import { ContainerGap } from '$lib/types/Gap'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import { BikeRoutes } from '$lib/types/Route'
	import { createEventDispatcher } from 'svelte'
	import { BikeRouteEvent, type BikeRouteItemEvents } from './types'
	import useService from '$lib/composables/useService'
	import type { UseAuth } from '$lib/modules/auth/composables/useAuth'
	import { ServiceKey } from '$lib/services/service'
	import JoyItemLoader from '../Loader/JoyItemLoader.svelte'
	import JoyAvatar from '../Avatar/JoyAvatar.svelte'

	export let route: BikeRouteModel

	let isLoading = false
	const { get } = useService()
	const { user } = get<UseAuth>(ServiceKey.USER)
	$: editRoute = `${BikeRoutes.EDITOR}?mode=edit&routeId=${route.id}`

	const dispatch = createEventDispatcher<BikeRouteItemEvents>()

	function deleteBikeRoute() {
		isLoading = true
		dispatch(BikeRouteEvent.DELETE, {
			bikeRoute: route,
			toggleLoading: () => (isLoading = !isLoading),
		})
	}
</script>

<JoyContainer col class="w-1/3 shrink-0 relative" padding={ContainerPadding.XXS}>
	<JoyItemLoader {isLoading} />
	<JoyContainer col class="h-[200px] bg-white" border={Border.XS} rounded={BorderRounded.LG}>
		<JoyText weight={FontWeight.SEMIBOLD} color={TextColor.PRIMARY_CONTENT}>
			{route.name}
		</JoyText>
		{#if $user}
			<JoyAvatar user={$user} />
		{/if}
		<JoyText
			weight={FontWeight.NORMAL}
			size={TextSize.SM}
			color={TextColor.PRIMARY_CONTENT}
			class="truncate text-ellipsis"
		>
			{route.description?.length ? route.description : 'No description'}
		</JoyText>
		<JoyRow class="justify-end mt-auto" gap={ContainerGap.XXS}>
			{#if route.user_id === $user?.id}
				<JoyButton
					label="Delete"
					variant={ButtonVariant.GHOST}
					class="font-normal group"
					size={ButtonSize.SM}
					on:click={deleteBikeRoute}
				>
					<JoyIcon
						icon="trash"
						size={Size.SM}
						class="group-hover:fill-error group-hover:stroke-error"
					/>
				</JoyButton>
				<JoyAnchor
					label="Edit"
					variant={ButtonVariant.GHOST}
					class="font-normal group"
					size={ButtonSize.SM}
					href={editRoute}
				>
					<JoyIcon
						icon="pencil"
						size={Size.SM}
						class="group-hover:fill-info group-hover:stroke-info"
					/>
				</JoyAnchor>
			{/if}

			<JoyAnchor
				href={`${BikeRoutes.SHOW}/${route.id}`}
				variant={ButtonVariant.NEUTRAL}
				size={ButtonSize.SM}>View</JoyAnchor
			>
		</JoyRow>
	</JoyContainer>
</JoyContainer>
