<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextSize } from '$lib/components/Base/Text/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import JoyModal from '$lib/components/Advanced/Modal/JoyModal.svelte'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import { BorderRounded, ContainerGap, Justify } from '$lib/types'
	import { users } from '$lib/modules/users'
	import { createAvatar } from '@dicebear/core'
	import { thumbs } from '@dicebear/collection'
	import type { User } from '$lib/modules/authentication'
	import { createEventDispatcher } from 'svelte'
	import { JoyUserPickerEvent, type UserPickerDispatch } from './types'

	export let isShown = false
	export let selectedUser: User | undefined
	const dispatch = createEventDispatcher<UserPickerDispatch>()

	export let hide: () => void = () => {
		isShown = false
	}

	const generateAvatar = (name: string) =>
		createAvatar(thumbs, {
			seed: name,
			size: 200,
		}).toDataUri()

	const selectUser = (user: User) => {
		dispatch(JoyUserPickerEvent.SELECT, user)
	}
</script>

<template>
	<JoyModal bind:isShown>
		<JoyContainer class="w-full" alignItems={AlignItems.CENTER}>
			<JoyText weight={FontWeight.NORMAL} size={TextSize.LG}>
				Select
				<JoyText weight={FontWeight.BOLD} size={TextSize.LG}>User</JoyText>
			</JoyText>

			<JoyButton
				class="rounded-full btn-circle ml-auto"
				variant={ButtonVariant.GHOST}
				on:click={hide}
			>
				<JoyIcon icon="xmark" />
			</JoyButton>
		</JoyContainer>

		<JoyContainer class="w-full" alignItems={AlignItems.CENTER}>
			<JoyInput
				class="w-full bg-base-200/50 placeholder-secondary-content/50"
				placeholder="Search"
				rounded={BorderRounded.LG}
			/>
		</JoyContainer>

		<JoyContainer
			class="w-full grow bg-base-200/50 overflow-y-auto p-2"
			gap={ContainerGap.XXS}
			alignItems={AlignItems.CENTER}
			rounded={BorderRounded.LG}
			col
		>
			{#each $users as user}
				<JoyButton
					plain
					size={ButtonSize.MD}
					class="w-full flex items-center justify-start px-4 py-2 gap-4 bg-base-100 hover:bg-base-200 rounded-lg"
					on:click={() => selectUser(user)}
				>
					<div class="max-w-[3rem] max-h-[3rem]">
						<img
							class="rounded-full w-full h-full"
							src={generateAvatar(user.name)}
							alt="user-avatar"
						/>
					</div>
					<JoyText>
						{user.name}
					</JoyText>
					{#if selectedUser?.id === user.id}
						<JoyIcon icon="check-circle-solid" class="ml-auto text-success" />
					{/if}
				</JoyButton>
			{/each}
		</JoyContainer>

		<!-- <JoyContainer class="w-full" justify={Justify.END} gap={ContainerGap.XXS}>
			<JoyButton label="Cancel" variant={ButtonVariant.GHOST} />
			<JoyButton label="Save" variant={ButtonVariant.ACCENT} />
		</JoyContainer> -->
	</JoyModal>
</template>
