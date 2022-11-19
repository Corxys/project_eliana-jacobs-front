<script setup>
defineProps({
  practice: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="practice">
    <img class="practice__image" :src="practice.img" alt="alt">
    <div class="practice__content">
      <h3 class="practice__title">
        {{practice.title}}
      </h3>
      <p class="practice__text">
        {{practice.text}}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.practice {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  column-gap: var(--spacing-between-horizontal-elements);
  margin-bottom: 30px;
  &__image {
    grid-column: 1 / 4;
    margin-right: var(--spacing-between-horizontal-elements);
    width: 100%;
  }
  &__content {
    grid-column: 4 / -1;
  }
  &__text {
    white-space: break-spaces;
  }
}
</style>
