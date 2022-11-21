<script setup>
// General
import {ref, provide} from "vue";
import {RouterView} from "vue-router";
import {DefaultApolloClient} from "@vue/apollo-composable";
import {ApolloClient, InMemoryCache} from "@apollo/client/core";

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  "uri": "https://eliana-jacobs-back.herokuapp.com/graphql",
  cache
});

// Components
import NavbarComponent from "./components/navbar-component.vue";
import FooterComponent from "./components/footer-component.vue";

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
}
</style>
