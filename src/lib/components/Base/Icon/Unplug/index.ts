import IconoirCrownCircle from '~icons/iconoir/crown-circle'
import IconoirHome from '~icons/iconoir/home'
import IconoirSettings from '~icons/iconoir/settings'
import IconoirMoneySquare from '~icons/iconoir/money-square'
import IconoirUserCircle from '~icons/iconoir/user-circle'
import IconoirPasswordCursor from '~icons/iconoir/password-cursor'
import IconoirSparksSolid from '~icons/iconoir/sparks-solid'
import IconoirXmarkCircle from '~icons/iconoir/xmark-circle'
import IconoirInfoCircle from '~icons/iconoir/info-circle'
import IconoirCheckCircle from '~icons/iconoir/check-circle'
import IconoirWarningCircle from '~icons/iconoir/warning-circle'
import IconoirPlusCircleSolid from '~icons/iconoir/plus-circle-solid'
import IconoirXmark from '~icons/iconoir/xmark'
import IconoirWrench from '~icons/iconoir/wrench'
import IconoirTrashSolid from '~icons/iconoir/trash-solid'
import IconoirRefreshDouble from '~icons/iconoir/refresh-double'
import IonExitOutline from '~icons/ion/exit-outline'
import SolarHandMoneyLinear from '~icons/solar/hand-money-linear'

export type UnplugIconName = keyof typeof icons
export const icons = {
	'check-circle': IconoirCheckCircle,
	'crown-circle': IconoirCrownCircle,
	'exit-outline': IonExitOutline,
	'hand-money-linear': SolarHandMoneyLinear,
	'info-circle': IconoirInfoCircle,
	home: IconoirHome,
	'money-square': IconoirMoneySquare,
	'password-cursor': IconoirPasswordCursor,
	'plus-circle-solid': IconoirPlusCircleSolid,
	'refresh-double': IconoirRefreshDouble,
	settings: IconoirSettings,
	'sparks-solid': IconoirSparksSolid,
	'trash-solid': IconoirTrashSolid,
	'user-circle': IconoirUserCircle,
	'warning-circle': IconoirWarningCircle,
	wrench: IconoirWrench,
	xmark: IconoirXmark,
	'xmark-circle': IconoirXmarkCircle,
}
