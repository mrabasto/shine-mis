import type { User } from '$lib/modules/authentication'

export enum JoyUserPickerEvent {
	SELECT = 'user-picker-selected',
}

export interface UserPickerDispatch {
	[JoyUserPickerEvent.SELECT]: User
}
