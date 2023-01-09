<script setup>
// General
import {ref, provide, computed} from "vue";
import {RouterView} from "vue-router";
import {DefaultApolloClient} from "@vue/apollo-composable";
import {ApolloClient, InMemoryCache} from "@apollo/client/core";
import {useStore} from "vuex";

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

// State
const isLoading = computed(() => store.state.app.isLoading);

// Ref
const isMenuOpen = ref(false);
const isTransitionScreenOpen = ref(false);

// Provider
provide("isMenuOpen", isMenuOpen);
provide("isTransitionScreenOpen", isTransitionScreenOpen);
provide(DefaultApolloClient, apolloClient);
</script>

<template>
  <navbar-component theme="light" />
  <div class="container" :class="{'container--stuck': isMenuOpen}">
    <!--    <div v-if="isLoading" class="container__loader" />-->
    <router-view />
  </div>
  <footer-component />
</template>

<style scoped lang="scss">
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
