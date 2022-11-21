
import navbarSearchAndPinList from '@/layouts/components/navbarSearchAndPinList';
import themeConfig from '@/../themeConfig.js';
import colors from '@/../themeConfig.js';

const state = {
	isSidebarActive: true,
	breakpoint: null,
	sidebarWidth: "default",
	reduceButton: themeConfig.sidebarCollapsed,
	bodyOverlay: false,
	sidebarItemsMin: false,
	theme: themeConfig.theme || 'light',
	navbarSearchAndPinList: navbarSearchAndPinList,
	AppActiveUser: {
		id: 0,
		name: 'Olamiposi Olorunsola',
		about: 'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
		img: 'avatar-s-16.png',
		status: 'online',
	},
	themePrimaryColor: colors.primary,
	
};
export default state;