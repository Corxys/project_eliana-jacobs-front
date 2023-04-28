<script setup>
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();

const imagePlaceholder = computed(() => {
  // Early return if there's no category selected.
  if (!store.state.selected.category) {
    return null;
  }

  const selectedCategory = store.state.categories[store.state.selected.category];

  // Return an empty string if there's no placeholder image.
  return selectedCategory.placeholder ? selectedCategory.placeholder : "";
});

</script>

<template>
  <section class="placeholder">
    <div class="placeholder__text">
      Coming soon!
      <br>
      <br>
      Check back soon for upcoming projects!
    </div>

    <div class="placeholder__image">
      <img class="placeholder__src" :src="imagePlaceholder" alt="Image placeholder for the selected category">
    </div>
  </section>
</template>

<style scoped lang="scss">
.placeholder {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 130px 0;

  &__text {
    text-align: center;
    margin-bottom: 30px;
  }

  &__image {
    max-width: 50%;
  }

  &__src {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
