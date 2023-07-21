const AUTO_CLICK_KEY = "autoClickEnabled";
const ENABLED_VALUE = "true";
const DISABLED_VALUE = "false";

const autoClickEnabled = () => {
	try {
		return window.localStorage.getItem(AUTO_CLICK_KEY) === ENABLED_VALUE;
	} catch (e) {
		return false;
	}
};

const toggleAutoClick = (enabled: boolean) => {
	try {
		window.localStorage.setItem(AUTO_CLICK_KEY, enabled ? ENABLED_VALUE : DISABLED_VALUE);
	} catch (e) {
		console.error("Failed to set preference, auto-click has been disabled");
		window.localStorage.removeItem(AUTO_CLICK_KEY);
	}
};

export { autoClickEnabled, toggleAutoClick };
