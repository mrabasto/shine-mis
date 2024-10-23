import IcBaselineBook from '~icons/ic/baseline-book'
import IcBaselineChatBubbleOutline from '~icons/ic/baseline-chat-bubble-outline'
import IcBaselineDashboard from '~icons/ic/baseline-dashboard'
import IcBaselineFolderShared from '~icons/ic/baseline-folder-shared'
import IcBaselinePowerSettingsNew from '~icons/ic/baseline-power-settings-new'
import IcBaselineRemoveRedEye from '~icons/ic/baseline-remove-red-eye'
import IcBaselineSettings from '~icons/ic/baseline-settings'
import IconoirCrownCircle from '~icons/iconoir/crown-circle'
import IconoirHome from '~icons/iconoir/home'
import IconoirSettings from '~icons/iconoir/settings'
import IconoirMoneySquare from '~icons/iconoir/money-square'
import IconoirUserCircle from '~icons/iconoir/user-circle'
import IconoirPasswordCursor from '~icons/iconoir/password-cursor'
import IconoirSparksSolid from '~icons/iconoir/sparks-solid'
import IconoirXmarkCircle from '~icons/iconoir/xmark-circle'
import IconoirXmarkCircleSolid from '~icons/iconoir/xmark-circle-solid'
import IconoirInfoCircle from '~icons/iconoir/info-circle'
import IconoirInfoCircleSolid from '~icons/iconoir/info-circle-solid'
import IconoirWarningCircleSolid from '~icons/iconoir/warning-circle-solid'
import IconoirCheckCircle from '~icons/iconoir/check-circle'
import IconoirCheckCircleSolid from '~icons/iconoir/check-circle-solid'
import IconoirWarningCircle from '~icons/iconoir/warning-circle'
import IconoirPlusCircleSolid from '~icons/iconoir/plus-circle-solid'
import IconoirXmark from '~icons/iconoir/xmark'
import IconoirWrench from '~icons/iconoir/wrench'
import IconoirTrashSolid from '~icons/iconoir/trash-solid'
import IconoirRefreshDouble from '~icons/iconoir/refresh-double'
import IconoirNavArrowUp from '~icons/iconoir/nav-arrow-up'
import IconoirShoppingBagPlus from '~icons/iconoir/shopping-bag-plus'
import IconoirQuestionMarkCircle from '~icons/iconoir/question-mark-circle'
import IconoirArrowRight from '~icons/iconoir/arrow-right'
import IconoirNavArrowLeft from '~icons/iconoir/nav-arrow-left'
import IconoirNavArrowRight from '~icons/iconoir/nav-arrow-right'
import IonExitOutline from '~icons/ion/exit-outline'
import IonAlarm from '~icons/ion/alarm'
import IonTime from '~icons/ion/time'
import IonPeopleSharp from '~icons/ion/people-sharp'
import SolarBellBold from '~icons/solar/bell-bold'
import SolarCashOutBold from '~icons/solar/cash-out-bold'
import SolarHandMoneyLinear from '~icons/solar/hand-money-linear'
import SolarHamburgerMenuLineDuotone from '~icons/solar/hamburger-menu-line-duotone'
import SolarSortByTimeBold from '~icons/solar/sort-by-time-bold'
import EosIconsLoading from '~icons/eos-icons/loading'

export type UnplugIconName = keyof typeof icons
export const icons = {
	alarm: IonAlarm,
	'arrow-right': IconoirArrowRight,
	'baseline-book': IcBaselineBook,
	'baseline-chat-bubble-outline': IcBaselineChatBubbleOutline,
	'baseline-dashboard': IcBaselineDashboard,
	'baseline-folder-shared': IcBaselineFolderShared,
	'baseline-power-settings-new': IcBaselinePowerSettingsNew,
	'baseline-remove-red-eye': IcBaselineRemoveRedEye,
	'baseline-settings': IcBaselineSettings,
	'bell-bold': SolarBellBold,
	'check-circle': IconoirCheckCircle,
	'check-circle-solid': IconoirCheckCircleSolid,
	'cash-out-bold': SolarCashOutBold,
	'crown-circle': IconoirCrownCircle,
	'exit-outline': IonExitOutline,
	'hand-money-linear': SolarHandMoneyLinear,
	'info-circle': IconoirInfoCircle,
	'info-circle-solid': IconoirInfoCircleSolid,
	home: IconoirHome,
	'hambuger-menu-line-duotone': SolarHamburgerMenuLineDuotone,
	'money-square': IconoirMoneySquare,
	loading: EosIconsLoading,
	'nav-arrow-left': IconoirNavArrowLeft,
	'nav-arrow-right': IconoirNavArrowRight,
	'nav-arrow-up': IconoirNavArrowUp,
	'password-cursor': IconoirPasswordCursor,
	'people-sharp': IonPeopleSharp,
	'plus-circle-solid': IconoirPlusCircleSolid,
	'question-mark-circle': IconoirQuestionMarkCircle,
	'refresh-double': IconoirRefreshDouble,
	settings: IconoirSettings,
	'shopping-bag-plus': IconoirShoppingBagPlus,
	'sort-by-time-bold': SolarSortByTimeBold,
	'sparks-solid': IconoirSparksSolid,
	'trash-solid': IconoirTrashSolid,
	time: IonTime,
	'user-circle': IconoirUserCircle,
	'warning-circle': IconoirWarningCircle,
	'warning-circle-solid': IconoirWarningCircleSolid,
	wrench: IconoirWrench,
	xmark: IconoirXmark,
	'xmark-circle': IconoirXmarkCircle,
	'xmark-circle-solid': IconoirXmarkCircleSolid,
} as const
