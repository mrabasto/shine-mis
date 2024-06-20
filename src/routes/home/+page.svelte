<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { Home } from '$lib/routes/types'
	import { ContainerGap } from '$lib/types'
</script>

<JoyContainer gap={ContainerGap.NONE}>
	<JoyText>{Home.INDEX}</JoyText>
</JoyContainer>
