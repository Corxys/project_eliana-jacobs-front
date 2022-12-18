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
    <div class="practice__container">
      <div class="practice__image">
        <img class="practice__image-src" :src="practice.img" alt="alt">
        <span class="practice__image-credits credits">
          Copyright
        </span>
      </div>
    </div>
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
  margin-bottom: 60px;
  &__container {
    grid-column: 1 / 4;
    margin-right: var(--spacing-between-horizontal-elements);
    width: 100%;
  }
  &__image {
    position: relative;
    &:hover {
      .credits {
        display: block;
      }
    }
    &-src {
      width: 100%;
    }
    &-credits {
      display: none;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: var(--epj-c-main);
      padding: 7px 10px 5px 10px;
    }
  }
  &__content {
    grid-column: 4 / -1;
  }
  &__text {
    white-space: break-spaces;
  }
}
</style>
