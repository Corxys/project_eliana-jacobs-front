<script setup>
defineProps({
  "text": {
    "type": String,
    "required": true,
  },
  "link": {
    "type": String,
    "required": false,
    "default": "",
  },
  "external": {
    "type": Boolean,
    "required": false,
    "default": () => "",
  },
});
</script>

<template>
  <!-- External link -->
  <a v-if="link && external" :href="link" class="button" target="_blank">
    <button class="button__content">
      {{text}}
    </button>
  </a>

  <!-- Internal link -->
  <router-link v-if="link && !external" :to="link" class="button">
    <button class="button__content">
      {{text}}
    </button>
  </router-link>

  <!-- Form button -->
  <button v-if="!link" class="button button--submit" type="submit">
    <span class="button__content">
      {{text}}
    </span>
  </button>
</template>

<style scoped lang="scss">
.button {
  display: table-cell;
  vertical-align: middle;
  height: 32px;
  padding: 0 12px;
  font-family: var(--font-primary);
  text-transform: uppercase;
  white-space: nowrap;
  background-color: var(--color-button-background-default);
  border: 1px solid var(--color-button-background-default);
  transition: 0.2s ease-in all;

  &:hover {
    background-color: var(--color-button-background-hover);
    border: 1px solid var(--color-button-border-hover);
  }

  &__content {
    line-height: 32px;
  }
}
</style>
