import JoyIconArrowLeft from './Variants/JoyIconArrowLeft.svelte'
import JoyIconArrowUp from './Variants/JoyIconArrowUp.svelte'
import JoyIconBike from './Variants/JoyIconBike.svelte'
import JoyIconBold from './Variants/JoyIconBold.svelte'
import JoyIconBubble from './Variants/JoyIconBubble.svelte'
import JoyIconCheck from './Variants/JoyIconCheck.svelte'
import JoyIconCursorPointer from './Variants/JoyIconCursorPointer.svelte'
import JoyIconFire from './Variants/JoyIconFire.svelte'
import JoyIconFlag from './Variants/JoyIconFlag.svelte'
import JoyIconHome from './Variants/JoyIconHome.svelte'
import JoyIconItalic from './Variants/JoyIconItalic.svelte'
import JoyIconLoading from './Variants/JoyIconLoading.svelte'
import JoyIconMap from './Variants/JoyIconMap.svelte'
import JoyIconMapPin from './Variants/JoyIconMapPin.svelte'
import JoyIconMegaphone from './Variants/JoyIconMegaphone.svelte'
import JoyIconPencil from './Variants/JoyIconPencil.svelte'
import JoyIconPeople from './Variants/JoyIconPeople.svelte'
import JoyIconPlus from './Variants/JoyIconPlus.svelte'
import JoyIconSave from './Variants/JoyIconSave.svelte'
import JoyIconThread from './Variants/JoyIconThread.svelte'
import JoyIconTrash from './Variants/JoyIconTrash.svelte'
import JoyIconUnderline from './Variants/JoyIconUnderline.svelte'
import JoyIconXMark from './Variants/JoyIconXMark.svelte'
import JoyIconXMarkCircled from './Variants/JoyIconXMarkCircled.svelte'
import JoyIconShop from './Variants/JoyIconShop.svelte'
import JoyIconEye from './Variants/JoyIconEye.svelte'
export enum Fill {
	ACCENT = 'fill-accent',
	ERROR = 'fill-error',
	INFO = 'fill-info',
	NEUTRAL = 'fill-neutral',
	NONE = 'fill-none',
	PRIMARY = 'fill-primary',
	SECONDARY = 'fill-secondary',
	SUCCESS = 'fill-success',
	WARNING = 'fill-warning',
}

export enum Stroke {
	ACCENT = 'stroke-accent',
	ERROR = 'stroke-error',
	INFO = 'stroke-info',
	NEUTRAL = 'stroke-neutral',
	NONE = 'stroke-none',
	PRIMARY = 'stroke-primary',
	SECONDARY = 'stroke-secondary',
	SECONDARY_CONTENT = 'stroke-secondary-content',
	SUCCESS = 'stroke-success',
	WARNING = 'stroke-warning',
}

export enum Size {
	LG = 'w-8 h-8',
	MD = 'w-6 h-6',
	SM = 'w-4 h-4',
	XL = 'w-10 h-10',
	XL_2 = 'w-12 h-12',
}

export type IconName = keyof typeof icons
export const icons = {
	arrowLeft: JoyIconArrowLeft,
	arrowUp: JoyIconArrowUp,
	bike: JoyIconBike,
	bold: JoyIconBold,
	bubble: JoyIconBubble,
	check: JoyIconCheck,
	'cursor-pointer': JoyIconCursorPointer,
	eye: JoyIconEye,
	fire: JoyIconFire,
	flag: JoyIconFlag,
	home: JoyIconHome,
	italic: JoyIconItalic,
	loading: JoyIconLoading,
	map: JoyIconMap,
	'map-pin': JoyIconMapPin,
	megaphone: JoyIconMegaphone,
	pencil: JoyIconPencil,
	people: JoyIconPeople,
	plus: JoyIconPlus,
	save: JoyIconSave,
	shop: JoyIconShop,
	thread: JoyIconThread,
	trash: JoyIconTrash,
	underline: JoyIconUnderline,
	xmark: JoyIconXMark,
	'xmark-circled': JoyIconXMarkCircled,
}
