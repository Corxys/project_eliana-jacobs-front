<script setup>
import {computed, inject} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import gsap from "gsap";

import logotypeWhite from "@/assets/images/logo-navbar-w.png";
import logotypeBlack from "@/assets/images/logo-navbar-b.png";

import {links} from "@/assets/data/links";

const router = useRouter();
const store = useStore();

let isMenuOpen = inject("isMenuOpen");
let colorTheme = inject("colorTheme");
const categories = computed(() => store.getters.categories);

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

// Transitions
const onBeforeEnter = (el) => {
  gsap.set(el, {
    "scaleY": 0,
  });
};
const onEnter = (el, done) => {
  gsap.to(el, {
    "duration": 0.5,
    "scaleY": 1,
    "ease": "power2.inOut",
    "onComplete": done,
  });
};
const onAfterEnter = () => {
  gsap.to(".navbar__link", {
    "duration": 0.5,
    "opacity": 1,
    "ease": "power2.inOut",
    "stagger": 0.1,
  });
};
const onBeforeLeave = () => {
  gsap.to(".navbar__link", {
    "duration": 0.5,
    "opacity": 0,
    "ease": "power2.inOut",
    "stagger": 0.1,
  });
};
const onLeave = (el, done) => {
  gsap.to(el, {
    "delay": el.querySelectorAll(".navbar__link").length * 0.1 + 0.5,
    "scaleY": 0,
    "onComplete": done,
  });
};
</script>

<template>
  <!-- NAVBAR -->
  <nav class="navbar">
    <!-- LOGO-->
    <div class="navbar__logo">
      <router-link to="/">
        <img
          v-if="colorTheme === 'dark'"
          class="navbar__logo-src"
          alt="Name of Eliana's handwritten (white version)"
          :src="logotypeWhite"
        >
        <img
          v-else
          class="navbar__logo-src"
          alt="Name of Eliana's handwritten (black version)"
          :src="logotypeBlack"
        >
      </router-link>
    </div>

    <!-- MENU -->
    <div class="navbar__menu">
      <!-- MENU LINES WITH BEFORE AFTER TO MAKE TOP & BOTTOM LINES -->
      <div
        class="navbar__menu-lines"
        :class="{
          'navbar__menu-lines--white': colorTheme === 'dark',
          'navbar__menu-lines--active': isMenuOpen,
        }"
        @click="isMenuOpen = !isMenuOpen"
      >
        <!-- MIDDLE LINE WITH BEFORE TO MAKE CROSS ANIMATION -->
        <span
          class="navbar__menu-line"
          :class="{
            'navbar__menu-line--white': colorTheme === 'dark',
            'navbar__menu-line--active': isMenuOpen,
          }"
        />
      </div>

      <!-- MENU TEXT -->
      <div
        class="navbar__menu-text"
        :class="{'navbar__menu-text--white': colorTheme === 'dark'}"
      >
        MENU
      </div>
    </div>

    <!-- MENU OVERLAY -->
    <transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div v-if="isMenuOpen" class="navbar__overlay">
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
    </transition>
  </nav>
</template>

<style scoped lang="scss">
@import "../assets/styles/transitions";

// NAVBAR
.navbar {
	width: 100vw;

  // LOGO & MENU BURGER
  &__logo, &__menu {
    z-index: 400;
    position: absolute;
    height: 100px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }

  // LOGO
  &__logo {
    left: 30px;
  }

  // MENU BURGER
  &__menu {
    cursor: pointer;
    right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 8px;

    // MENU BURGER LINES
    &-lines {
      position: relative;
      width: 42px;
      height: 30px;

      // TOP & BOTTOM LINES
      &:before, &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 4px;
        background-color: var(--color-text-light);
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

      // WHITE THEME TOP & BOTTOM LINES
      &--white {
        &:before, &:after {
          background-color: var(--color-text-dark)
        }
      }

      // MENU ACTIVE TOP & BOTTOM LINES
      &--active {
        &:before, &:after {
          width: 0;
          transition: all 0.2s ease-in-out;
        }
      }
    }

    // MIDDLE LINE
    &-line {
      position: absolute;
      top: 50%;
      margin-top: -2px;
      display: block;
      width: 100%;
      height: 4px;
      background-color: var(--color-text-light);
      transition: transform 0.2s ease-in-out;

      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: var(--color-text-light);
        transition: transform 0.2s ease-in-out;
      }

      // WHITE THEME MIDDLE LINE
      &--white {
        background-color: var(--color-text-dark);
        &:before, &:after {
          background-color: var(--color-text-dark);
        }
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

    // BUTTON TEXT
    &-text {
      &--white {
        color: var(--color-text-dark);
      }
    }
  }

  // OVERLAY
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
    opacity: 0;
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

// RESPONSIVE DESKTOP
@media (min-width: 768px) {
	.navbar {
		&__logo, &__menu {
			position: fixed;
		}
	}
}
</style>
