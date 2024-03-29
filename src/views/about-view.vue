<template>
	<div class="about">
		<main class="about__container">
			<header class="about__header">
				<h1 class="about__title">Eliana is a performance, circus, visual and conceptual artist and singer.</h1>

				<div class="about__actions">
					<div class="about__icons">
						<!-- Instagram profile -->
						<icon-social-component
							:icon="['fab', 'instagram']"
							:link="instagram"
						/>

						<!-- YouTube channel -->
						<icon-social-component
							:icon="['fab', 'youtube']"
							:link="youtubeChannel"
						/>
					</div>

					<div class="about__buttons">
						<!-- Contact page button -->
						<button-custom-component
							text="Contact me"
							link="/contact"
							:external="false"
						/>

						<!-- Button to download CV -->
						<button-custom-component
							text="Download my CV"
							:link="cv"
							:external="true"
						/>
					</div>
				</div>
			</header>

			<article class="about__content">
				<h2 class="about__subtitle">Practices</h2>

				<div class="about__practices">
					<practice-component
						v-for="practice of practices"
						:key="practice.id"
						:practice="practice"
					/>
				</div>
			</article>
		</main>

		<!-- Shapes in the background -->
		<img
			class="about__shape about__shape-01"
			:src="shapeTopRight"
			alt="Shape in the bottom right of the site."
		/>
		<img
			class="about__shape about__shape-02"
			:src="shapeBottomLeft"
			alt="Shape in the bottom left of the site."
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "vuex";

import shapeTopRight from "@/assets/images/shapes/about-01.png";
import shapeBottomLeft from "@/assets/images/shapes/about-02.png";
import IconSocialComponent from "@/components/shared-components/icon-social-component.vue";
import ButtonCustomComponent from "@/components/shared-components/button-custom-component.vue";
import PracticeComponent from "@/components/about-components/practice-component.vue";
import type { Practice } from "@/common/types";

// #region Composables
const store = useStore();
// #endregion

// #region Computed
const cv = computed(() => store.state.cv);
const instagram = computed(() => store.state.instagram);
const youtubeChannel = computed(() => store.state.youtube);

const practices = computed<Practice[] | null>(() => {
	return store.state.practices ? Object.values(store.state.practices) : null;
});
// #endregion
</script>

<style scoped lang="scss">
.about {
	background: radial-gradient(circle at 1.39% 92.63%, #110f10, transparent 30%), radial-gradient(circle at 51.11% 4.47%, #110f10, transparent 100%),
		radial-gradient(circle at 87.39% 82.76%, #110f10, transparent 100%), radial-gradient(circle at 32.5% 59.81%, #205251, transparent 100%),
		radial-gradient(circle at 74.72% 29.6%, #110f10, transparent 100%), radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);

	&__container {
		z-index: 10;
		position: relative;
	}

	&__title {
		margin-bottom: 30px;
	}

	&__header {
		margin-bottom: 30px;
		padding-bottom: 30px;
		border-bottom: 1px solid var(--color-white);
	}

	&__actions,
	&__icons,
	&__buttons {
		display: flex;
	}

	&__actions {
		flex-wrap: wrap;
	}

	&__icons {
		margin-bottom: 10px;
		:deep(.icon-social) {
			margin-right: 10px;
		}
	}

	&__buttons {
		display: flex;
		column-gap: 10px;
	}

	&__subtitle {
		margin-bottom: 30px;
	}

	&__practices {
		display: flex;
		flex-direction: column;
		gap: 30px;

		:deep(.image) {
			height: auto;
		}

		:deep(.practice) {
			&:last-child {
				margin-bottom: 0;
			}

			.image {
				margin-bottom: 30px;
			}
		}
	}

	&__shape {
		position: absolute;

		&-01 {
			width: 70%;
			right: 0;
			top: 270px;
		}
		&-02 {
			width: 80%;
			bottom: 5%;
			left: 0;
		}
	}
}

@media (min-width: 768px) {
	.about {
		&__header {
			margin-bottom: 60px;
			padding-bottom: 60px;
		}

		&__title {
			margin-bottom: 50px;
		}

		&__subtitle {
			margin-bottom: 60px;
		}

		&__shape {
			&-01 {
				width: 50%;
				max-width: 520px;
			}

			&-02 {
				width: 70%;
				max-width: 870px;
			}
		}
	}
}
</style>
