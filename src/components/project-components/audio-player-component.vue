<script setup>
/**
 * @property {Object} media Audio media.
 * @property {string} media.id ID of the audio media.
 * @property {string} media.url URL to the media.
 **/

defineProps({
	"media": {
		"type": Object,
		"required": true,
		"default": () => ({"id": "", "url": ""})
	},
});
</script>

<template>
  <div class="player">
    <audio :id="media.id" class="player__src" :src="media.url" controls />
  </div>
</template>

<style scoped lang="scss">
.player {
	&__src {
		width: 100%;
	}
}
</style>
