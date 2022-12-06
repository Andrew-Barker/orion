<template>
	<transition name="slidedown">
		<div class="notice" v-if="showNotice">
			<IconComponent name="times" width="16" height="16" @click="showNotice = false" />
		</div>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			showNotice: false,
		}
	},

	mounted() {
		setTimeout(() => {
			this.showNotice = true
		}, 15000)
	},
}
</script>
