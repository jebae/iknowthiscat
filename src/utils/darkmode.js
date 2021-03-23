export const isWindowDarkmode = () => {
	if (window.matchMedia) {
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	}
	return false;
}

export const addColorSchemeListener = (onChange) => {
	if (!window.matchMedia)
		return ;

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
		onChange(isWindowDarkmode());
	})
}
