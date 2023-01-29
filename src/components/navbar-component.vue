<script setup>
/*
* TODO:
* - fix size of the icon in the social button
* - navbar shifts when the scrollbar appears
*/

// General
import {computed, inject} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

// Hook call
const router = useRouter();
const store = useStore();

// Images
import logotypeWhite from "@/assets/images/logo-w.png";
import logotypeBlack from "@/assets/images/logo-b.png";

// Data
import {links} from "@/assets/data/links";

// Inject
let isMenuOpen = inject("isMenuOpen");

// Props
defineProps({
  "theme": {
    "type": String,
    "required": true,
  },
});

// State
const categories = computed(() => store.state.categories);

// Methods
const getProjectsByCategory = (name) => {
  store.dispatch("setCategory", {"category": name.toLowerCase()});
	store.dispatch("setFilter", {"filter": "all"});
  isMenuOpen.value = false;
};
const goOnPage = (src) => {
  router.push(src);
  store.dispatch("setCategory", {"category": ""});
  store.dispatch("setFilter", {"filter": "all"});
  isMenuOpen.value = false;
};
</script>

<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <router-link to="/">
        <img v-if="theme === 'dark'" class="navbar__logo-src" alt="Name of Eliana's handwritten (white version)" :src="logotypeWhite">
        <img v-else class="navbar__logo-src" alt="Name of Eliana's handwritten (black version)" :src="logotypeBlack">
      </router-link>
    </div>
    <div class="navbar__container">
      <div class="navbar__button" @click="isMenuOpen = !isMenuOpen">
        <div class="navbar__button-burger" :class="{'navbar__button-burger--active': isMenuOpen}">
          <span class="navbar__button-icon" :class="{'navbar__button-icon--white': theme === 'dark'}" />
        </div>
        <span class="navbar__button-text" :class="{'navbar__button-text--white': theme === 'dark'}">
          MENU
        </span>
      </div>
    </div>
    <div v-if="isMenuOpen" class="navbar__menu">
      <div
        v-for="link of links"
        :key="link.id"
        class="navbar__link"
        @click="goOnPage(link.src)"
      >
        <span class="navbar__link-text">
          {{link.name}}
        </span>
      </div>
      <div
        v-for="category of categories"
        :key="category.id"
        class="navbar__link"
        @click="getProjectsByCategory(category.attributes.name)"
      >
        <span class="navbar__link-text">
          {{category.attributes.name}}
        </span>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
	display: flex;
	justify-content: space-between;
	width: 100vw;
  /* Logo and menu burger positioning */
  &__logo, &__container {
    z-index: 150;
    height: 100px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
		flex-wrap: nowrap;
  }
  &__logo {
    left: 30px;
    &-src {
      width: 108px;
    }
  }
  &__container {
    right: 30px;
  }

  /* Menu burger styling */
  &__button {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-burger {
      position: relative;
      width: 30px;
      height: 24px;
      margin-bottom: 8px;
      span, &:before, &:after {
        position: absolute;
        display: block;
        width: 100%;
        height: 4px;
      }
      &:before, &:after {
        content: "";
        transition: width 0.2s ease-in-out 0.4s;
      }
      &:after {
        top: 0;
        left: 0;
      }
      &:before {
        bottom: 0;
        right: 0;
      }
      span {
        top: 50%;
        margin-top: -2px;
        transition: transform 0.2s;
        &:before {
          content: "";
          width: 100%;
          height: 4px;
          position: absolute;
          left: 0;
          transition: transform 0.2s;
        }
      }
      &--active {
        &:after {
          transition: all 0.2s;
          width: 0;
          left: 0;
        }
        &:before {
          transition: all 0.2s;
          width: 0;
          right: 0;
        }
        span {
          transform: rotate(45deg);
          transition: 0.3s transform 0.4s ;
          &:before {
            transform: rotate(-90deg);
            transition: 0.3s transform 0.4s ;
          }
        }
      }
    }
    &-text {
      font-size: 11px;
      &--white {
        color: var(--color-text-dark);
      }
    }
  }

  /* Menu with links positioning and styling */
  &__menu {
    z-index: 10;
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
  }
  &__link {
    cursor: pointer;
    font-size: 35px;
    font-family: var(--font-primary);
    margin: 5px 0;
    padding: 10px 30px 7px 30px;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: var(--epj-c-main);
    }
    &-text {
      display: inline;
    }
    &:nth-child(3) {
      margin-bottom: 60px;
    }
  }
}

@media (min-width: 768px) {
	.navbar {
		&__logo, &__container {
			position: fixed;
		}
	}
}
</style>
