<script setup>
/**
 * @property {Object} media
 * @property {string} media.copyright Credits photographer.
 * @property {string} media.mime Mime format of the media.
 * @property {string} media.link Link of the YouTube video, if any.
 * @property {string} article.address.street Street name of the event.
 * @property {string} article.address.city City of the event.
 * @property {string} article.website Website where to get more details about the event.
 * @property {string} article.publishedAt Publication date of the article.
 **/

import { computed } from "vue";
import { useStore } from "vuex";

import PreviewComponent from "@/components/preview-component.vue";
import AudioPlayerComponent from "@/components/project-components/audio-player-component.vue";

const props = defineProps({
	media: {
		type: Object,
		required: true,
		default: () => ({ link: "", copyright: "", mime: "", url: "", alternativeText: "" }),
	},
	hasPreview: {
		type: Boolean,
		required: false,
		default: false,
	},
});

const store = useStore();

const imageMimesTypesCheck = /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/;
const audioMimesTypesCheck = /audio\/mp3|audio\/wav|audio\/ogg/;
const mediaIsImage = computed(() => imageMimesTypesCheck.test(props.media.mime));
const mediaIsAudio = computed(() => audioMimesTypesCheck.test(props.media.mime));
const mediaIsVideo = computed(() => props.media.link);

const hasImageOnPreview = computed(() => store.state.app.hasImageOnPreview);
const mediaImage = computed(() => (mediaIsImage.value ? props.media.url : ""));
const imageAlt = computed(() => (mediaIsImage.value ? props.media.alternativeText : ""));
const mediaLink = computed(() => props.media.link);

const youTubeVideoLink = computed(() => {
	const YOUTUBE_LINK = "https://www.youtube.com/embed/";

	return YOUTUBE_LINK + props.media.link.split("=")[1];
});

const displayImageOnPreview = () => {
	store.dispatch("setImageOnPreview", true);
};
</script>

<template>
	<div class="media">
		<!-- IMAGE MEDIA -->
		<div
			v-if="!props.media.link && mediaIsImage"
			class="image"
		>
			<img
				class="image__src"
				:src="mediaImage"
				:alt="imageAlt"
				@click="displayImageOnPreview"
			/>
			<div
				v-if="media.copyright"
				class="image__copyright"
			>
				{{ media.copyright }}
			</div>
			<div
				v-if="hasPreview"
				class="image__preview"
			>
				<font-awesome-icon
					class="image__icon"
					:icon="['fas', 'expand']"
				/>
			</div>
			<preview-component
				v-if="hasPreview && hasImageOnPreview"
				:image="mediaImage"
				:copyright="media.copyright"
			/>
		</div>

		<!-- VIDEO MEDIA -->
		<div
			v-else-if="mediaIsVideo"
			class="video"
		>
			<iframe
				v-if="mediaLink"
				class="video__src"
				width="560"
				height="315"
				:src="youTubeVideoLink"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			/>
		</div>

		<!-- AUDIO MEDIA -->
		<div
			v-else-if="mediaIsAudio"
			class="video"
		>
			<audio-player-component :media="media" />
		</div>

		<div v-else>No corresponding media.</div>
	</div>
</template>

<style scoped lang="scss">
.media {
	position: relative;
	width: 100%;
	height: 100%;
}

// Media image
.image {
	position: relative;
	width: 100%;
	height: 100%;

	&__src {
		width: 100%;
	}

	&__copyright,
	&__preview {
		min-height: 30px;
		position: absolute;
		bottom: 0;
		background-color: var(--color-main);
		color: var(--color-white);
	}

	&__copyright {
		display: none;
		align-items: center;
		left: 0;
		padding: 5px 8px;
		max-width: calc(100% - 40px);
	}

	&__preview {
		cursor: pointer;
		width: 30px;
		right: 0;

		svg {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	&:hover {
		.image__copyright {
			display: flex;
		}
	}
}

.video {
	&__src {
		width: 100%;
	}
}
</style>
