

<template>
	<div class="todo__filters-container">

		<!-- all -->
		<div class="px-6 py-4">
			<div class="flex cursor-pointer" :class="{'text-primary': todoFilter == 'all'}" @click="applyTodoFilter('all')">
				<feather-icon icon="MailIcon" :svgClasses="[{'text-primary stroke-current': todoFilter == 'all'}, 'h-6 w-6']"></feather-icon>
				<span class="text-lg ml-3">All</span>
			</div>
		</div>

		<vs-divider></vs-divider>

		<!-- starred -->
		<div class="px-6 py-4">
			<h5>Filters</h5>

			<template v-for="filter in todoFilters">
				<div class="flex mt-6 cursor-pointer" :class="{'text-primary': todoFilter == filter.filter}" @click="applyTodoFilter(filter.filter)" :key="filter.filter">
					<feather-icon :icon="filter.icon" :svgClasses="[{'text-primary stroke-current': todoFilter == filter.filter}, 'h-6 w-6']"></feather-icon>
					<span class="text-lg ml-3">{{ filter.filterName }}</span>
				</div>
			</template>

		</div>

		<vs-divider></vs-divider>

		<div class="px-6 py-4">
			<h5>Labels</h5>
			<div class="todo__lables-list">
				<div class="todo__label flex items-center mt-6 cursor-pointer" v-for="(tag, index) in approvalTags" :key="index" @click="applyTodoFilter(tag.value)">
					<div class="h-4 w-4 rounded-full mr-4" :class="'bg-' + tag.color"></div>
					<span class="text-lg">{{ tag.text }}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>

export default{
	data() {
		return {
			todoFilters: [
				{ filterName: 'Sales', filter: 'starred', icon: 'StarIcon' },
				{ filterName: 'Purchase', filter: 'important', icon: 'InfoIcon' },
				{ filterName: 'Inventory', filter: 'done', icon: 'CheckIcon' },
                { filterName: 'Budget', filter: 'trashed', icon: 'TrashIcon' },
				{ filterName: 'Finance', filter: 'trashed', icon: 'TrashIcon' }, 
			]
		}
	},
	computed: {
		approvalTags() {
			return this.$store.state.approval.approvalTags;
		},
		todoFilter() {
			return this.$store.state.todo.todoFilter;
		}
	},
	methods: {
		applyTodoFilter(filterName) {
			this.$store.dispatch('todo/applyTodoFilter', filterName);
			this.$emit('closeSidebar', false);
		},
	},
}
</script>