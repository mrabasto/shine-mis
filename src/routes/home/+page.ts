import { Finance } from '$lib/routes/types'
import { redirect } from '@sveltejs/kit'

export const load = () => {
	return redirect(301, Finance.CASH_REQUESTS)
}
