<script setup>
// Props
defineProps({
	"media": {
		"type": Object,
		"required": true,
	},
});
</script>

<template>
	<div class="player">
		<audio :id="media.id" class="player__src" :src="media.src.data.attributes.url" controls>
		</audio>
	</div>
</template>

<style scoped lang="scss">
.player {
	&__src {
		width: 100%;
	}
}
</style>
