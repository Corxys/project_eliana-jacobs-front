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
  <!-- TODO: create custom button for submit event -->
  <div v-if="!link" class="button button--submit">
    <div class="button__content">
      <div class="button__text">
        {{text}}
      </div>
    </div>
  </div>

  <!-- <input v-if="!link" class="button__content button__content--submit" type="submit" :value="text"> -->
</template>

<style scoped lang="scss">
.button {
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
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
    margin-top: 4px;

  }
  &--submit {
    height: 100%;
  }
}
</style>
