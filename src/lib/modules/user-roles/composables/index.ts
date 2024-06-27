import type { Role, Roles } from '$lib/modules/user-roles/types'
import { currentUserRoles } from '$lib/modules/user-roles/stores'
import { get } from 'svelte/store'

export const userIs = (roleName: Roles): boolean => {
	const hasRole = get(currentUserRoles).findIndex((role: Role) => role.name === roleName)
	return hasRole !== -1
}
