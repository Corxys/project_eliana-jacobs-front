<script setup lang="ts">
import { useStore } from "vuex";

import router from "@/router";
import { formatDate } from "@/utils/formatDate";
import { slugifyString } from "@/utils/slugify";
import { Size } from "@/common/enums";
import type { Article } from "@/common/types";

interface Props {
	article: Article;
	size: Size;
}
defineProps<Props>();

// #region Composables
const store = useStore();
// #endregion

// #region Functions
function goToTheArticlePage(articleTitle: string): void {
	const slugifiedTitle = slugifyString(articleTitle);

	store.dispatch("setArticle", slugifiedTitle);

	router.push(`/news/${slugifiedTitle}`);
}
// #endregion
</script>

<template>
	<!-- Small size -->
	<div
		v-if="size === 'small'"
		class="article-card--small"
	>
		<div
			class="link--image"
			@click="goToTheArticlePage(article.title)"
		>
			<img
				class="image"
				:src="article.image.url"
				alt=""
			/>
		</div>
		<div class="content">
			<h4
				class="title"
				@click="goToTheArticlePage(article.title)"
			>
				<span>
					{{ article.title }}
				</span>
			</h4>
			<div class="date">
				{{ formatDate(article.date.date) }}
			</div>
		</div>
	</div>

	<!-- Medium size -->
	<div
		v-if="size === 'medium'"
		class="article-card--medium"
	>
		<div
			class="link--image"
			@click="goToTheArticlePage(article.title)"
		>
			<img
				class="image"
				:src="article.image.url"
				alt=""
			/>
		</div>
		<div class="content">
			<h4
				class="title"
				@click="goToTheArticlePage(article.title)"
			>
				<span>
					{{ article.title }}
				</span>
			</h4>
			<div class="date">
				{{ formatDate(article.date.date) }}
			</div>
		</div>
	</div>

	<!-- Large size -->
	<div
		v-if="size === 'large'"
		class="article-card--large"
	>
		<div
			class="link--image"
			@click="goToTheArticlePage(article.title)"
		>
			<img
				class="image"
				:src="article.image.url"
				:alt="article.image.alternativeText"
			/>
		</div>
		<div class="content">
			<h3
				class="title"
				@click="goToTheArticlePage(article.title)"
			>
				<span>
					{{ article.title }}
				</span>
			</h3>
			<div class="date">
				{{ formatDate(article.date.date) }}
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.link--image {
	cursor: pointer;
	overflow: hidden;
}

.image {
	object-fit: cover;
	transition: scale 0.2s ease-in-out;

	&:hover {
		scale: 1.05;
	}
}

.title span {
	cursor: pointer;
	transition: color 0.2s ease-in-out;

	&:hover {
		color: rgba(255, 255, 255, 0.8);
	}
}

// Article card (small)
.article-card--small {
	display: grid;
	grid-template-columns: repeat(2, 50%);
	grid-template-rows: 1fr;
	overflow: hidden;

	.link--image {
		grid-area: 1 / 1 / 2 / 2;
		height: 100%;
	}

	.image {
		width: 100%;
		height: 100%;
	}

	.content {
		margin-left: 10px;
	}
}

// Article card (medium)
.article-card--medium {
	margin-bottom: var(--margin-x-elements);
	overflow: hidden;

	.image {
		width: 100%;
		height: 145px;
		max-height: 245px;
	}

	.title {
		margin: 10px 0 5px 0;
	}
}

// Article card (large)
.article-card--large {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr max-content;
	grid-area: 1 / 1 / 4 / 2;
	height: 450px;
	border: 1px solid var(--color-white);
	overflow: hidden;

	.link--image {
		grid-area: 1 / 1 / 3 / 2;
		height: 100%;
	}

	.image {
		height: 100%;
		width: 100%;
	}

	.content {
		margin-top: 5px;
	}
}
</style>
