<script lang="ts">
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonVariant } from '$lib/components/Base/Button/types'
</script>

<div class="h-screen grid place-items-center">
	<JoyButton variant={ButtonVariant.GHOST}>Test</JoyButton>
</div>
