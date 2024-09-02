<script lang="ts">
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextColor, TextSize } from '$lib/components/Base/Text/types'
	import { createTimer } from '$lib/composables/useDateUtils'
	import { activeRoute } from '$lib/routes'
	import { BorderRounded, ContainerGap, ContainerPadding, Justify } from '$lib/types'
	import { DateTime } from 'luxon'
	import { onDestroy, onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { attendanceService } from '$lib/modules/attendance'
	import { user } from '$lib/modules/authentication'
	import { ButtonVariant } from '$lib/components/Base/Button'

	const { loadAttendanceLogs, createAttendanceLog, timeOutAttendanceLog } =
		attendanceService()

	const textColor = TextColor.ACCENT

	const currentTime = writable<DateTime>(DateTime.now())
	const { clearTimer } = createTimer(1000, () => ($currentTime = DateTime.now()))

	const handleTimeIn = () => createAttendanceLog($user).then(console.log)
	const handleTimeOut = () => timeOutAttendanceLog($user).then(console.log)

	onMount(async () => {
		const loadingError = await loadAttendanceLogs()

		if (loadingError) {
			console.log({ loadingError })
		}
	})

	onDestroy(clearTimer)
</script>

<JoyText size={TextSize.XL_3} weight={FontWeight.BOLD}>
	{$activeRoute?.label}
</JoyText>

<JoyContainer
	rounded={BorderRounded.MD}
	class="bg-primary/25 w-full"
	padding={ContainerPadding.LG}
	justify={Justify.BETWEEN}
>
	<JoyContainer col gap={ContainerGap.XXS}>
		<JoyText size={TextSize.XL_2} color={textColor}>Hello, {$user?.name}!</JoyText>

		<JoyText size={TextSize.XL_2} weight={FontWeight.BOLD} color={TextColor.ACCENT}>
			{$currentTime?.toLocaleString(DateTime.DATE_FULL)}
		</JoyText>
		<JoyText size={TextSize.XL_3} weight={FontWeight.NORMAL} color={TextColor.ACCENT}>
			{$currentTime?.toLocaleString(DateTime.TIME_WITH_SECONDS)}
		</JoyText>
	</JoyContainer>

	<JoyContainer col gap={ContainerGap.XXS}>
		<JoyButton variant={ButtonVariant.PRIMARY} on:click={handleTimeIn} class="w-full"
			>New Log</JoyButton
		>
		<JoyButton on:click={handleTimeOut} class="w-full" disabled
			>New Leave Request</JoyButton
		>
	</JoyContainer>
</JoyContainer>
