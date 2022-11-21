<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
    default: "",
  },
  external: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <router-link v-if="link && external" :to="link" class="button">
    <button class="button__content">
      <div class="button__text">
        {{text}}
      </div>
    </button>
  </router-link>
  <a v-if="link && !external" :href="link" class="button">
    <button class="button__content">
      <div class="button__text">
        {{text}}
      </div>
    </button>
  </a>
  <button v-if="!link" class="button button--submit" type="submit">
    <div class="button__content">
      <span class="button__text">
        {{text}}
      </span>
    </div>
  </button>
</template>

<style scoped lang="scss">
.button {
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    font-family: var(--font-primary);
    text-transform: uppercase;
    padding-left: 12px;
    padding-right: 12px;
    background-color: var(--color-button-background-default);
    border: 1px solid var(--color-button-background-default);
    transition: 0.2s ease-in all;
    &:hover {
      background-color: var(--color-button-background-hover);
      border: 1px solid var(--color-button-border-hover);
    }
  }
  &__text {
    white-space: nowrap;
    margin-bottom: -0.1em;
  }
  &--submit {
    height: 100%;
  }
}
</style>
