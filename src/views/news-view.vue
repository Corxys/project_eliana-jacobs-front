<template>
	<section class="news">
		<div class="news__container">
			<h1 class="news__title">News</h1>

			<div
				v-if="news"
				class="news__content"
			>
				<header class="news__header">
					<article class="news__highlight">
						<!-- The last article published -->
						<div class="news__main">
							<article-card
								:article="news[0]"
								:size="Size.LARGE"
							/>
						</div>

						<!-- Three articles in column -->
						<div class="news__column">
							<article-card
								v-for="article of news.slice(1, 4)"
								:key="article.id"
								:article="article"
								:size="Size.SMALL"
							/>
						</div>
					</article>
				</header>

				<div class="news__all">
					<h2 class="news__subtitle">All news</h2>

					<div class="news__articles">
						<article-card
							v-for="article of news"
							:key="article.id"
							:article="article"
							:size="Size.MEDIUM"
						/>
					</div>
				</div>
			</div>

			<!-- Placeholder for the news page-->
			<div v-else>
				Oops, an error occurred while fetching the news.
				<br />
				Try again later, and don't hesitate to contact me if the problem persists!
			</div>
		</div>

		<!-- Shape in the background -->
		<img
			class="news__shape"
			:src="shapeTop"
			alt="Shape in the top of the site."
		/>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "vuex";

import shapeTop from "@/assets/images/shapes/news-01.png";
import ArticleCard from "@/components/news-components/article-card-component.vue";
import { Size } from "@/common/enums";
import type { Article } from "@/common/types";

// #region Composables
const store = useStore();
// #endregion

// #region Computed
const news = computed<Article[] | null>(() => {
	return store.state.news
		? Object.values(store.state.news as Article[]).sort((article1, article2) => {
				// @ts-ignore
				return new Date(article2.date.date) - new Date(article1.date.date);
		  })
		: null;
});
// #endregion
</script>

<style scoped lang="scss">
.news {
	padding-bottom: 0;
	background: radial-gradient(circle at 27.28% 77.78%, #110f10, transparent 55%), radial-gradient(circle at 14.11% 26.17%, #110f10, transparent 100%),
		radial-gradient(circle at 87.39% 82.76%, #110f10, transparent 100%), radial-gradient(circle at 63.61% 15.89%, #205251, transparent 100%),
		radial-gradient(circle at 59.06% 87.12%, #110f10, transparent 100%), radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);

	&__container {
		z-index: 10;
		position: relative;
	}

	&__header {
		padding-bottom: 30px;
		border-bottom: 1px solid var(--color-white);
		margin-bottom: 30px;
	}

	&__title {
		margin-bottom: 30px;
	}

	&__highlight {
		display: flex;
		flex-direction: column;
	}

	&__main {
		margin-bottom: 30px;
	}

	&__column {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, 1fr);
		gap: 30px 0;
		grid-area: 1 / 2 / 2 / 3;
		height: 450px;

		> :nth-child(1) {
			grid-area: 1 / 1 / 2 / 2;
		}

		> :nth-child(2) {
			grid-area: 2 / 1 / 3 / 2;
		}

		> :nth-child(3) {
			grid-area: 3 / 1 / 4 / 2;
		}
	}

	&__all {
		background-color: var(--color-secondary-opacified);
		padding: 30px 30px 100px 30px;
	}

	&__articles {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: var(--margin-x-elements);
	}

	&__subtitle {
		margin-bottom: 30px;
	}

	&__shape {
		position: absolute;
		width: 70%;
		max-width: 940px;
		top: -120px;
		left: 140px;
		transform: rotate(-10deg);
	}
}

@media (min-width: 768px) {
	.news {
		&__highlight {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 1fr;
			gap: 0 30px;
			height: 450px;

			> :nth-child(1) {
				grid-area: 1 / 1 / 2 / 2;
			}
		}
	}
}
</style>
