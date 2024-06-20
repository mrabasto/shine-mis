import IconoirCrownCircle from '~icons/iconoir/crown-circle'
import IconoirHome from '~icons/iconoir/home'
import IconoirSettings from '~icons/iconoir/settings'
import IconoirMoneySquare from '~icons/iconoir/money-square'
import IconoirUserCircle from '~icons/iconoir/user-circle'
import IconoirPasswordCursor from '~icons/iconoir/password-cursor'
import IconoirSparksSolid from '~icons/iconoir/sparks-solid'
import SolarHandMoneyLinear from '~icons/solar/hand-money-linear'

export type UnplugIconName = keyof typeof icons
export const icons = {
	'crown-circle': IconoirCrownCircle,
	'hand-money-linear': SolarHandMoneyLinear,
	home: IconoirHome,
	'money-square': IconoirMoneySquare,
	'password-cursor': IconoirPasswordCursor,
	settings: IconoirSettings,
	'sparks-solid': IconoirSparksSolid,
	'user-circle': IconoirUserCircle,
}
