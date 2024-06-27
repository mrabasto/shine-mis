import { App } from '$lib/modules/app'
import { Home } from '$lib/routes/types'
import { redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { object, string } from 'zod'

const schema = object({
	username: string().min(1, { message: "Username can't be empty" }),
	password: string().min(1, { message: "Password can't be empty" }),
})

export async function load() {
	const auth = App.getAuthStore()

	if (auth.isValid) {
		return redirect(301, Home.INDEX)
	}

	const form = await superValidate(zod(schema))

	return { form, schema }
}
