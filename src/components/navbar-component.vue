<template>
	<nav
		class="navbar"
		:class="{ 'navbar--light': themeMustBeLight }"
	>
		<!-- Logo -->
		<div class="navbar__logo">
			<router-link
				to="/"
				@click="onClickWebsiteLogo"
			>
				<img
					v-if="themeMustBeLight"
					class="navbar__logo-src"
					alt="Name of Eliana's handwritten (black version)"
					:src="logotypeBlack"
				/>
				<img
					v-else
					class="navbar__logo-src"
					alt="Name of Eliana's handwritten (white version)"
					:src="logotypeWhite"
				/>
			</router-link>
		</div>

		<!-- Menu -->
		<div
			class="navbar__button"
			@click="onClickBurgerMenu"
		>
			<!-- Menu lines with with pseudo class ":before" and ":after" to make top and bottom lines -->
			<div
				class="navbar__burger"
				:class="{ 'navbar__burger--active': isMenuOpen }"
			>
				<!-- Middle line with pseudo class ":before" to make cross animation -->
				<span
					class="navbar__burger-line"
					:class="{ 'navbar__burger-line--active': isMenuOpen }"
				/>
			</div>

			<!-- Menu text -->
			<div class="navbar__text">MENU</div>
		</div>

		<!-- Overlay menu -->
		<transition
			@before-enter="onBeforeEnter"
			@enter="onEnter"
			@after-enter="onAfterEnter"
			@before-leave="onBeforeLeave"
			@leave="onLeave"
		>
			<div
				v-if="isMenuOpen"
				class="navbar__overlay"
			>
				<div
					v-for="link of links"
					:key="link.id"
					class="navbar__link"
					@click="onClickGlobalLink(link.src)"
				>
					<span class="navbar__link-text">
						{{ link.name }}
					</span>
				</div>
				<div
					v-for="category of categories"
					:key="category.id"
					class="navbar__link"
					@click="onClickCategoryLink(category.name)"
				>
					<span class="navbar__link-text">
						{{ category.name }}
					</span>
				</div>
			</div>
		</transition>
	</nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import logotypeBlack from "@/assets/images/logo-navbar-b.png";
import logotypeWhite from "@/assets/images/logo-navbar-w.png";
import { links } from "@/assets/data/links";
import { CategoryNameFull, CategoryNameSlug, FilterNameSlug } from "@/common/enums";
import { onAfterEnter, onBeforeEnter, onBeforeLeave, onEnter, onLeave } from "@/utils/gsap";
import { defineRouteToPush } from "@/utils/pushRoute";
import type { Category } from "@/common/types";

// #region Hooks
const store = useStore();
const router = useRouter();
// #endregion

// #region Computed
const category = computed<CategoryNameSlug>(() => store.state.selected.category);
const filter = computed<FilterNameSlug>(() => store.state.selected.filter);
const categories = computed<Category[]>(() => store.getters.categories);
const isMenuOpen = computed<boolean>(() => store.state.app.isMenuOpen);
const themeMustBeLight = computed<boolean>(() => store.getters.themeMustBeLight);
// #endregion

// #region Functions
function onClickBurgerMenu() {
	store.dispatch("setIsMenuOpen", !isMenuOpen.value);
}
async function onClickCategoryLink(name: CategoryNameFull) {
	await store.dispatch("setCategory", name);

	const routeToPush = await defineRouteToPush(category.value, filter.value);

	await router.push(routeToPush);
	await store.dispatch("setIsMenuOpen", false);
}
async function onClickWebsiteLogo() {
	await store.dispatch("setCategory", CategoryNameSlug.EMPTY);
	await store.dispatch("setProject", "");
	await store.dispatch("setIsMenuOpen", false);
}
async function onClickGlobalLink(src: string) {
	await store.dispatch("setCategory", CategoryNameSlug.EMPTY);
	await store.dispatch("setProject", "");

	await router.push(src);

	await store.dispatch("setIsMenuOpen", false);
}
// #endregion
</script>

<style scoped lang="scss">
@import "../assets/styles/transitions";

// Navbar
.navbar {
	position: absolute;
	z-index: 900;
	width: 100vw;
	color: var(--color-text-dark);

	// Light theme
	&--light {
		.navbar {
			&__burger {
				&:before,
				&:after {
					background-color: var(--color-burger-lines-light);
				}

				&-line {
					background-color: var(--color-burger-lines-light);

					&:before {
						background-color: var(--color-burger-lines-light);
					}
				}
			}

			&__text {
				color: var(--color-text-light);
			}
		}
	}

	// Logo and button menu
	&__logo,
	&__button {
		z-index: 400;
		position: absolute;
		height: 100px;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}

	// Logo
	&__logo {
		left: 30px;
	}

	// Button menu
	&__button {
		cursor: pointer;
		right: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		row-gap: 8px;
	}

	// Lines of the burger menu
	&__burger {
		position: relative;
		width: 42px;
		height: 30px;

		// Top and bottom lines
		&:before,
		&:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 4px;
			background-color: var(--color-burger-lines-dark);
			transition: width 0.2s ease-in-out 0.4s;
		}

		&:before {
			top: 0;
			left: 0;
		}

		&:after {
			bottom: 0;
			right: 0;
		}

		&--active {
			&:before,
			&:after {
				width: 0;
				transition: all 0.2s ease-in-out;
			}
		}

		&-line {
			position: absolute;
			top: 50%;
			margin-top: -2px;
			display: block;
			width: 100%;
			height: 4px;
			background-color: var(--color-burger-lines-dark);
			transition: transform 0.2s ease-in-out;

			&:before {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: var(--color-burger-lines-dark);
				transition: transform 0.2s ease-in-out;
			}

			&--active {
				transform: rotate(-45deg);
				transition: 0.3s transform 0.4s ease-in-out;

				&:before {
					transform: rotate(90deg);
					transition: 0.3s transform 0.4s ease-in-out;
				}
			}
		}
	}

	// Overlay
	&__overlay {
		z-index: 100;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		color: white;
		background-color: var(--color-overlay-background);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transform-origin: top center;

		&--open {
			height: 100vh;
		}
	}

	&__link {
		display: table-cell;
		vertical-align: middle;
		cursor: pointer;
		opacity: 0;
		font-size: 3.8vh;
		font-family: var(--font-primary);
		margin: 5px 0;
		padding: 1.2vh 3vh 0.7vh 3vh;
		transition: background-color 0.2s ease;

		&:hover {
			background-color: var(--color-main);
		}

		&:nth-child(3) {
			margin-bottom: 5vh;
		}
	}
}

// Responsive desktop
@media (min-width: 768px) {
	.navbar {
		&__logo,
		&__button {
			position: fixed;
		}
	}
}
</style>
