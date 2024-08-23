<script lang="ts">
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
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

	const { loadAttendanceLogs, createAttendanceLog, timeOutAttendanceLog } =
		attendanceService()

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
	class="bg-primary w-full"
	padding={ContainerPadding.LG}
	justify={Justify.BETWEEN}
>
	<div>
		<JoyText size={TextSize.XL_2} weight={FontWeight.BOLD} color={TextColor.BASE_100}
			>Hello, USER_NAME</JoyText
		>

		<JoyText size={TextSize.XL_2} weight={FontWeight.BOLD} color={TextColor.BASE_100}>
			{$currentTime?.toLocaleString(DateTime.DATE_FULL)}
		</JoyText>
		<JoyText size={TextSize.XL_2} weight={FontWeight.BOLD} color={TextColor.BASE_100}>
			{$currentTime?.toLocaleString(DateTime.TIME_WITH_SECONDS)}
		</JoyText>
	</div>
	<JoyRow gap={ContainerGap.XXS}>
		<JoyButton on:click={handleTimeIn}>Time In</JoyButton>
		<JoyButton on:click={handleTimeOut}>Time Out</JoyButton>
	</JoyRow>
</JoyContainer>
