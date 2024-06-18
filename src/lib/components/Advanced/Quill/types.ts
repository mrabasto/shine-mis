import type Quill from 'quill'

export enum QuillKeyboard {
	CTRL_SHIFT_ENTER = 'ctrl-shift-enter',
	ENTER = 'enter',
}

// export type QuillKeyboardEvents = {
// 	[key in QuillKeyboard]: Quill
// }

export interface QuillKeyboardEvents {
	[QuillKeyboard.CTRL_SHIFT_ENTER]: Quill
}
