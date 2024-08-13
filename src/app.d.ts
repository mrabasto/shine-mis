// See https://kit.svelte.dev/docs/types#app

import type { CashRequest } from '$lib/modules/finance/cash-request'
import type { CashRequestDrawerMode } from '$lib/modules/finance/cash-request/components/types'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			cashRequestDrawer?: {
				isOpen: boolean
				drawerMode: CashRequestDrawerMode
			}
		}
		// interface Platform {}
	}
}

export {}
