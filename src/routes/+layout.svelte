<script lang="ts">
	import 'tailwindcss/tailwind.css'
	import '$lib/css/app.css'
	import JoyShell from '$lib/components/Advanced/Shell/JoyShell.svelte'
	import JoyScreenSize from '$lib/components/Advanced/ScreenSize/JoyScreenSize.svelte'
	import JoyItemLoader from '$lib/components/Advanced/Loader/JoyItemLoader.svelte'
	import { App } from '$lib/modules/app'
	const { isLoading } = App
</script>

<JoyShell>
	<JoyItemLoader bind:isLoading={$isLoading} />
	<JoyScreenSize />
	<slot />
</JoyShell>
