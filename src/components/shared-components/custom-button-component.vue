<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  external: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <router-link v-if="link && external" :to="link" class="custom-button">
    <button>
      {{text}}
    </button>
  </router-link>
  <a v-if="link && !external" :href="link" class="custom-button">
    <button>
      {{text}}
    </button>
  </a>
  <input v-if="!link" class="custom-button custom-button--submit" type="submit" :value="text">
</template>

<style scoped lang="scss">
.custom-button {
  font-family: var(--font-primary);
  text-transform: uppercase;
  padding: 7px 12px;
  background-color: var(--color-button-background-default);
  border: 1px solid var(--color-button-background-default);
  transition: 0.2s ease-in all;
  line-height: 0.6rem;
  &:hover {
    background-color: var(--color-button-background-hover);
    border: 1px solid var(--color-button-border-hover);
  }
  &--submit {
    padding: 7px 12px;
  }
}
</style>
