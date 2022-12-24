<script setup>
// Components
import ImageCustom from "../image-custom-component.vue";

// Props
defineProps({
  practice: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="practice">
    <div class="practice__container">
      <image-custom
        :image="practice.attributes.image.src.data.attributes"
        :copyright="practice.attributes.image.copyright"
      />
    </div>
    <div class="practice__content">
      <h3 class="practice__title">
        {{practice.attributes.title}}
      </h3>
      <p class="practice__text">
        {{practice.attributes.text}}
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
  margin-bottom: 60px;
  &__container {
    grid-column: 1 / 4;
    margin-right: var(--spacing-between-horizontal-elements);
    width: 100%;
  }
  &__content {
    grid-column: 4 / -1;
  }
  &__text {
    white-space: pre-line;
  }
}
</style>
