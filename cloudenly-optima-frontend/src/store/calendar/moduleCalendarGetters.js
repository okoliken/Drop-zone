
export default {
	eventById: state => (eventId) => {
		return state.calendarEvents.filter((event) => event.id == eventId)[0];
	},
}