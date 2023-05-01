<script setup>
import {ref, provide, computed, watch} from "vue";
import {useStore} from "vuex";
import {RouterView, useRoute} from "vue-router";
import {DefaultApolloClient} from "@vue/apollo-composable";
import {ApolloClient, InMemoryCache} from "@apollo/client/core";

import loadingScreenLogotype from "@/assets/images/logo-loading-screen.png";

import NavbarComponent from "@/components/navbar-component.vue";
import FooterComponent from "./components/footer-component.vue";
import ErrorComponent from "@/components/shared-components/error-component.vue";

const store = useStore();
const route = useRoute();

const isMenuOpen = ref(false);
const colorTheme = ref("dark");
const isLoading = computed(() => store.state.app.isLoading);
const hasTransitionScreen = computed(() => store.state.app.hasTransitionScreen);
const errorMessage = computed(() => store.state.app.errorMessage);

const apolloClient = new ApolloClient({
  "uri": "https://eliana-jacobs-back.herokuapp.com/graphql",
  "cache": new InMemoryCache()
});

provide("isMenuOpen", isMenuOpen);
provide("colorTheme", colorTheme);
provide(DefaultApolloClient, apolloClient);

watch(() => route, (param) => {
	if (
    param.fullPath.includes("/projects/visual-art") ||
		param.fullPath.includes("/projects/art-performance") ||
		param.fullPath.includes("/projects/digital-media")
	) {
    colorTheme.value = "light";
  } else {
    colorTheme.value = "dark";
  }
}, {"deep": true, "immediate": true});
</script>

<template>
  <div class="app__container">
    <!-- Loading screen -->
    <transition name="loading" duration="500">
      <div v-if="isLoading" class="loading-screen">
        <div class="loading-screen__container">
          <img
            class="loading-screen__logo"
            :src="loadingScreenLogotype"
            alt="Eliana's logotype"
          >
          <h4 class="loading-screen__text">
            Loading screen
          </h4>
        </div>
      </div>
    </transition>

    <!-- Site -->
    <main
      class="main"
      :class="`theme--${colorTheme}`"
    >
      <div>
        <navbar-component />
        <div
          class="main__container"
          :class="{'main__container--stuck': isLoading || isMenuOpen || hasTransitionScreen}"
        >
          <router-view v-if="!errorMessage" />
          <error-component v-else />
        </div>
        <footer-component />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@import "./assets/styles/transitions.scss";

.app {
  &__container {
    position: relative;
  }
}

.main {
  z-index: -100;
  position: absolute;

  &__container {
    width: 100vw;
    &--stuck {
      position: fixed;
    }
  }
}

// LOADING SCREEN
.loading-screen {
  z-index: 500;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background:
    radial-gradient(circle at 1.39% 92.63%, #110F10, transparent 30%),
    radial-gradient(circle at 51.11% 4.47%, #110F10, transparent 100%),
    radial-gradient(circle at 87.39% 82.76%, #110F10, transparent 100%),
    radial-gradient(circle at 32.5% 59.81%, #205251, transparent 100%),
    radial-gradient(circle at 74.72% 29.6%, #110F10, transparent 100%),
    radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    animation: loadingScreen 2s ease infinite;
  }
  &__logo {
    width: 217px;
  }
  &__text {
    font-size: 14px;
  }
}

@keyframes loadingScreen {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
}

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
