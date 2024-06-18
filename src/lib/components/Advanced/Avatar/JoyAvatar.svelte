<script lang="ts">
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { TextSize, FontWeight } from '$lib/components/Base/Text/types'
	import { ContainerGap } from '$lib/types/Gap'
	import { type User } from '$lib/modules/auth/types'
	let clazz = ''
	export { clazz as class }
	export let user: User | undefined = undefined
	$: avatarClass = `text-ellipsis shrink-0 items-center ${clazz}`
</script>

<JoyRow class={avatarClass} gap={ContainerGap.XXS}>
	<span class="h-8 w-8 rounded-full bg-primary grid place-items-center text-sm">US</span>
	<JoyText size={TextSize.XS} weight={FontWeight.NORMAL}>{user?.name || 'user12345'}</JoyText>
</JoyRow>
