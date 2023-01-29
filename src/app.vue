<script setup>
// General
import {ref, provide, computed, watch} from "vue";
import {RouterView} from "vue-router";
import {DefaultApolloClient} from "@vue/apollo-composable";
import {ApolloClient, InMemoryCache} from "@apollo/client/core";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  "uri": "https://eliana-jacobs-back.herokuapp.com/graphql",
  cache
});

// Components
import NavbarComponent from "./components/navbar-component.vue";
import FooterComponent from "./components/footer-component.vue";

// Hook call
const store = useStore();
const route = useRoute();

// Ref
const colorTheme = ref("dark");
const isMenuOpen = ref(false);
const isTransitionScreenOpen = ref(false);

// Watchers
watch(() => route, (param) => {
	if (param.fullPath.includes("/projects/visual-art") ||
		param.fullPath.includes("/projects/art-performance") ||
		param.fullPath.includes("/projects/digital-media")
	) {
    colorTheme.value = "light";
  } else {
    colorTheme.value = "dark";
  }
}, {"deep": true, "immediate": true});

// Provider
provide("isMenuOpen", isMenuOpen);
provide("isTransitionScreenOpen", isTransitionScreenOpen);
provide(DefaultApolloClient, apolloClient);
provide("colorTheme", colorTheme);
</script>

<template>
  <div :class="['theme', `theme--${colorTheme}`]">
    <navbar-component :theme="colorTheme" />
    <footer-component />
    <div :class="['container', `theme--${colorTheme}`, {'container--stuck': isMenuOpen}]">
      <!--    <div v-if="isLoading" class="container__loader" />-->
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.theme {
  width: 100%;
  height: 100%;
  &--light {
    background-color: var(--epj-c-white);
    color: var(--epj-c-black);
    .transition {
      background-color: var(--epj-c-white);
      color: var(--epj-c-black);
    }
    .projects {
      &__item {
        border: 1px solid var(--epj-c-black);
      }
      &__filter {
        border: 1px solid var(--epj-c-main);
        background-color: var(--epj-c-white);
        color: var(--epj-c-main);
        &--active {
          border: 1px solid var(--epj-c-main);
          background-color: var(--epj-c-main);
          color: var(--epj-c-white);
        }
      }
      &__filter:hover {
        border: 1px solid var(--epj-c-black);
        background-color: var(--epj-c-black);
        color: var(--epj-c-white);
      }
    }
    .navbar {
      &__container {
        color: var(--epj-c-black);
      }
      &__button {
        color: var(--epj-c-black);
        &-burger {
          span, &:before, &:after {
            background-color: var(--epj-c-black);
          }
        }
        &-icon {
          &:before {
            background-color: var(--epj-c-black);
          }
        }
      }
    }
  }
  &--dark {
    background-color: var(--epj-c-black);
    color: var(--epj-c-white);
    .transition {
      background-color: var(--epj-c-black);
      color: var(--epj-c-white);
    }
    .projects {
      &__item {
        border: 1px solid var(--epj-c-white);
      }
      &__filter {
        border: 1px solid var(--epj-c-white);
        background-color: var(--epj-c-black);
        color: var(--epj-c-white);
        &--active {
          border: 1px solid var(--epj-c-main);
          background-color: var(--epj-c-main);
          color: var(--epj-c-white);
        }
      }
      &__filter:hover {
        border: 1px solid var(--epj-c-white);
        background-color: var(--epj-c-white);
        color: var(--epj-c-black);
      }
    }

    .navbar {
      &__container {
        color: var(--epj-c-white);
      }
      &__button {
        color: var(--epj-c-white);
        &-burger {
          span, &:before, &:after {
            background-color: var(--epj-c-white);
          }
        }
        &-icon {
          &:before {
            background-color: var(--epj-c-white);
          }
        }
      }
    }
  }
}
.container {
  width: 100vw;
  &--stuck {
    position: fixed;
  }
	&__loader {
		z-index: 100;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--epj-c-black);
		opacity: 1;
		transition: opacity 1s ease;
	}
}
</style>
