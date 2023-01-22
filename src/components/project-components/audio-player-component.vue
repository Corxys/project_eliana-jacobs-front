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
	<div class="interview-page__audio__file">
		<div class="interview-page__audio__file__source">
			<audio :id="media.id" :src="media.src.data.attributes.url" controls>
			</audio>
		</div>
	</div>
</template>
