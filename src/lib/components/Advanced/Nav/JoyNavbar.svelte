<script lang="ts">
	import JoyAnchor from '$lib/components/Base/Anchor/JoyAnchor.svelte'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonVariant } from '$lib/components/Base/Button/types'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import useService from '$lib/composables/useService'
	import useAuthRepo from '$lib/modules/auth/composables/useAuthRepo'
	import type { UseAuth } from '$lib/modules/auth/composables/useAuth'
	import { ServiceKey } from '$lib/services/service'
	import { ContainerGap } from '$lib/types/Gap'
	import useLocalStorage from '$lib/composables/useLocalStorage'
	import { goto } from '$app/navigation'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { BorderRounded } from '$lib/types/Round'
	import { Shadow } from '$lib/types/Shadow'
	import { ContainerPadding } from '$lib/types/Padding'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import { InputVariant } from '$lib/components/Base/Input/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { Account, Home } from '$lib/types/Route'

	const { get } = useService()
	const { logoutUser } = useAuthRepo()
	const { save } = useLocalStorage()

	const { isAuth, token, eraseAuth, user } = get<UseAuth>(ServiceKey.USER)

	async function logout() {
		if (!$token) return

		await eraseAuth(logoutUser($token))
		;['user', 'token', 'isAuth'].map((k) => save(k, null))
	}

	function gotoRoot() {
		if ($isAuth) return goto(Home.INDEX)

		goto('/')
	}
</script>

<JoyRow
	class="justify-between bg-gray-100"
	rounded={BorderRounded.MD}
	shadow={Shadow.MD}
	padding={ContainerPadding.XXS}
>
	<!-- <JoyAnchor label="BikeHub" variant={ButtonVariant.GHOST} href="/" /> -->
	<JoyRow gap={ContainerGap.XXS} class="w-1/2">
		<JoyButton label="BikeHub" variant={ButtonVariant.GHOST} on:click={gotoRoot}>
			<JoyIcon icon="bike"></JoyIcon>
		</JoyButton>

		<!-- <JoyContainer
			class="bg-base-100 shadow-lg border-2 grow"
			rounded={BorderRounded.MD}
			padding={ContainerPadding.NONE}
		>
			<JoyInput placeholder="Search" class="w-full focus:outline-none focus:border-transparent" />
		</JoyContainer> -->
	</JoyRow>

	<JoyRow gap={ContainerGap.XXS}>
		{#if !$isAuth}
			<JoyAnchor label="Sign In" variant={ButtonVariant.PRIMARY} href={Account.SIGN_IN} />
		{:else}
			<JoyButton
				variant={ButtonVariant.GHOST}
				label={`Welcome, ${$user?.name}!`}
				class="font-normal"
			/>
			<JoyButton label="Sign Out" variant={ButtonVariant.PRIMARY} on:click={logout} />
		{/if}
	</JoyRow>
</JoyRow>
