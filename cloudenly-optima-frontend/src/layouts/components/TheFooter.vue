<template>
	<footer class="the-footer flex-wrap justify-between " :class="classes">
		<span >COPYRIGHT @ 2020 ,  <a href="https://scelloo.com" target="_blank" rel="nofollow">Scelloo</a>, All rights Reserved</span>
		<span>Cloudenly suite</span>
	</footer>
</template>

<script>

export default {
	name: "the-footer",
	props: {
		classes: {
			type: String,
		},
	},
}
</script>