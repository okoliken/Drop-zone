
// MAIN COLORS - VUESAX THEME COLORS
let colors = {
	primary: '#0747a6',
	success: '#28C76F',
	danger: '#EA5455',
	warning: '#FF9F43',
	dark: '#1E1E1E',
}

import Vue from 'vue'
import Vuesax from 'vuesax'
Vue.use(Vuesax, { theme:{ colors } });


// CONFIGS
const themeConfig = {
	theme: 'optima',						// options[String]: 'light'(default), 'dark', 'semi-dark'
	sidebarCollapsed: false,			// options[Boolean]: true, false(default) 								   	
	navbarColor: "#fff",				// options[String]: HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
	navbarType: "sticky",				// options[String]: floating(default) / static / sticky / hidden
	footerType: "sticky",				// options[String]: static(default) / sticky / hidden
	routerTransition: 'fade',		// options[String]: zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
	disableCustomizer: true,			// options[Boolean]: true, false(default)
};

export default themeConfig;