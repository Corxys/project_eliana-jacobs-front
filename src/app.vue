<script setup>
import { provide, computed } from "vue";
import { useStore } from "vuex";
import { RouterView, useRoute } from "vue-router";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";

import loadingScreenLogotype from "@/assets/images/logo-loading-screen.png";

import NavbarComponent from "@/components/navbar-component.vue";
import FooterComponent from "./components/footer-component.vue";
import ErrorComponent from "@/components/shared-components/error-component.vue";
import { slugifyString } from "@/utils/slugify";
import { CategoryNameSlug } from "@/common/enums";

const { state, getters, dispatch } = useStore();
const route = useRoute();

const apolloClient = new ApolloClient({
	uri: "https://eliana-jacobs-back.herokuapp.com/graphql",
	cache: new InMemoryCache(),
});
const lightTheme = computed(() => getters.lightTheme);
const isLoading = computed(() => state.app.isLoading);
const isMenuOpen = computed(() => state.app.isMenuOpen);
const errorMessage = computed(() => state.app.errorMessage);
const filters = computed(() => {
	const categoryWithFilterAll = [CategoryNameSlug.CIRCUS];
	const storedSelectedFilter = window.localStorage.getItem("filter");
	const filtersByCategory = getters.filtersByCategory;

	if (!filtersByCategory) {
		return null;
	}

	const filterIsAlreadySelected = filtersByCategory.some((filter) => slugifyString(filter.name) === storedSelectedFilter);

	// If there is already a filter selected, and it corresponds to one
	// of the filters of the selected category, it is selected again.
	if (filterIsAlreadySelected) {
		dispatch("setFilter", storedSelectedFilter);
	} else {
		if (categoryWithFilterAll.includes(route.params.slug)) {
			dispatch("setFilter", "All");
		} else {
			dispatch("setFilter", "");
		}
	}

	return filtersByCategory;
});

provide(DefaultApolloClient, apolloClient);

/**
 * Changes the selected filter.
 * @param name - Name of the selected filter.
 **/
const selectFilter = (name) => {
	dispatch("setFocusedImageIndex", 0);
	dispatch("setFilter", name);
};
</script>

<template>
	<div
		class="container"
		:class="{ 'container--light': lightTheme }"
	>
		<!-- Loading screen -->
		<transition name="loading-transition">
			<div
				v-if="isLoading"
				class="loading"
			>
				<img
					class="loading__logo"
					:src="loadingScreenLogotype"
					alt="Eliana's logotype"
				/>
				<h4 class="loading__text">Loading</h4>
			</div>
		</transition>

		<!-- Site -->
		<main class="main">
			<!-- Navbar -->
			<navbar-component />

			<!-- Pages -->
			<div
				class="main__container"
				:class="{ 'main__container--stuck': isLoading || isMenuOpen }"
			>
				<!-- Router -->
				<router-view v-if="!errorMessage" />

				<!-- Error message if there's one -->
				<error-component v-else />
			</div>

			<!-- Footer -->
			<footer-component />
		</main>
	</div>
</template>

<style lang="scss">
@import "./assets/styles/transitions.scss";

.main__container {
	min-width: 100vw;
}

.container {
	min-width: 100vw;
	min-height: 100vh;
	position: relative;
	background-color: var(--color-background-dark);
	color: var(--color-text-dark);
	font-size: 1.4vw;
	font-family: var(--font-secondary);

	&--light {
		background-color: var(--color-background-light);
		color: var(--color-text-light);
	}

	&__loader {
		z-index: 100;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--color-black);
		opacity: 1;
		transition: opacity 1s ease;
	}
}

// Loading screen
.loading {
	z-index: 1000;
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 20px;
	width: 100vw;
	height: 100vh;
	background: radial-gradient(circle at 1.39% 92.63%, #110f10, transparent 30%), radial-gradient(circle at 51.11% 4.47%, #110f10, transparent 100%),
		radial-gradient(circle at 87.39% 82.76%, #110f10, transparent 100%), radial-gradient(circle at 32.5% 59.81%, #205251, transparent 100%),
		radial-gradient(circle at 74.72% 29.6%, #110f10, transparent 100%), radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);

	&__logo,
	&__text {
		animation: loadingScreen 2s ease infinite;
	}

	&__logo {
		width: 217px;
	}

	&__text {
		font-size: 14px;
	}
}

.main__container {
	&--stuck {
		position: fixed;
	}
}

@keyframes loadingScreen {
	0%,
	50%,
	100% {
		opacity: 1;
	}
	25%,
	75% {
		opacity: 0;
	}
}
</style>
