import IconoirCrownCircle from '~icons/iconoir/crown-circle'
import IconoirSettings from '~icons/iconoir/settings'
import IconoirMoneySquare from '~icons/iconoir/money-square'
import IconoirUserCircle from '~icons/iconoir/user-circle'
import IconoirPasswordCursor from '~icons/iconoir/password-cursor'
import IconoirSparksSolid from '~icons/iconoir/sparks-solid'

export type UnplugIconName = keyof typeof icons
export const icons = {
	'crown-circle': IconoirCrownCircle,
	'money-square': IconoirMoneySquare,
	'password-cursor': IconoirPasswordCursor,
	settings: IconoirSettings,
	'sparks-solid': IconoirSparksSolid,
	'user-circle': IconoirUserCircle,
}
