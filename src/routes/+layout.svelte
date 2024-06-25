<script lang="ts">
	import 'tailwindcss/tailwind.css'
	import '$lib/css/app.css'
	import JoyShell from '$lib/components/Advanced/Shell/JoyShell.svelte'
	import JoyScreenSize from '$lib/components/Advanced/ScreenSize/JoyScreenSize.svelte'
</script>

<JoyShell>
	<JoyScreenSize />
	<slot />
</JoyShell>
