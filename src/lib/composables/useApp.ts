import type { SidebarLinks } from '$lib/components/Advanced/HomeSidebar/types'
import type { Writable } from 'svelte/store'

import { links } from './types'

export interface UseApp {
	links: Writable<Array<SidebarLinks>>
}
export default (): UseApp => {
	return {
		links,
	}
}
