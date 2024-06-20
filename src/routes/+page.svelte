<script lang="ts">
	import { goto } from '$app/navigation'
	import JoyLoginBg from '$lib/components/Advanced/Svg/JoyLoginBG.svelte'
	import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button/types.js'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Size } from '$lib/components/Base/Icon/types'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import { InputSize } from '$lib/components/Base/Input/types'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextSize, TextTag } from '$lib/components/Base/Text/types'
	import { auth, signIn, user } from '$lib/modules/authentication'
	import { Justify, ContainerPadding, ContainerGap } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import { superForm } from 'sveltekit-superforms'
	import { zod } from 'sveltekit-superforms/adapters'

	export let data
	let toast: JoyToast

	let isAuthenticating = false

	const { form, enhance, constraints } = superForm(data.form, {
		SPA: true,
		resetForm: false,
		validators: zod(data.schema),
		onUpdate({ form }) {
			if (form.valid) {
				isAuthenticating = true
				signIn($form.username, $form.password)
					.then((response) => {
						auth.set(response)
						user.set(response.record)
						goto('/home', { replaceState: true })
					})
					.catch(({ response }) => {
						console.error({ response })
						toast.toggleShown(response.message)
					})
					.finally(() => (isAuthenticating = false))
			}
		},
	})
</script>

<JoyContainer
	class="w-full h-full bg-gradient-to-tr from-[#a0c1e9] via-[#ecf7fe] to-[#f5f5f5] relative"
	justify={Justify.CENTER}
	alignItems={AlignItems.CENTER}
>
	<div class="absolute inset-0">
		<JoyLoginBg
			class="absolute inset-0 bg-transparent 
				[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
		/>
	</div>

	<form method="post" use:enhance>
		<JoyContainer padding={ContainerPadding.MD} col class="bg-transparent relative">
			<JoyToast bind:this={toast} target="shell" />

			<JoyText
				tag={TextTag.H1}
				size={TextSize.XL_4}
				weight={FontWeight.BOLD}
				class="mb-4 w-full flex items-center gap-2"
			>
				Shine!
				<JoyIcon icon="sparks-solid" size={Size.XL_2} class="text-yellow-400" />
			</JoyText>

			<JoyContainer col gap={ContainerGap.MD} class="w-full">
				<div class="relative w-full">
					<JoyInput
						class="w-full"
						size={InputSize.LG}
						type="text"
						bind:value={$form.username}
						placeholder="Username"
						bordered
						attributes={$constraints.username}
					>
						<JoyIcon icon="user-circle" slot="labeled-l" size={Size.LG} />
					</JoyInput>
				</div>

				<div class="relative w-full">
					<JoyInput
						class="w-full"
						size={InputSize.LG}
						type="password"
						bind:value={$form.password}
						placeholder="Password"
						attributes={$constraints.password}
						bordered
					>
						<JoyIcon icon="password-cursor" slot="labeled-l" size={Size.LG} />
					</JoyInput>
				</div>
			</JoyContainer>

			<JoyContainer justify={Justify.END} class="w-full mt-4">
				<JoyButton size={ButtonSize.MD} variant={ButtonVariant.PRIMARY} type="submit"
					>Sign in to account</JoyButton
				>
			</JoyContainer>
		</JoyContainer>
	</form>
</JoyContainer>
