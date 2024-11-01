<script lang="ts">
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import { type User } from '$lib/modules/authentication/types'
	import { initials } from '@dicebear/collection'
	import { createAvatar } from '@dicebear/core'

	interface Props {
		class?: string
		user: User
	}

	let { class: clazz = '', user }: Props = $props()
	let avatarClass = $derived(`max-w-[2.5rem] max-h-[2.5rem] ${clazz}`)
	let src = $derived(
		createAvatar(initials, {
			seed: user.username,
			size: 200,
		}).toDataUri()
	)
</script>

<JoyRow class={avatarClass}>
	<img class="rounded-full w-full h-full" {src} alt="user-avatar" />
</JoyRow>
