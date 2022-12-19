<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  // eslint-disable-next-line vue/require-default-prop
  alt: {
    type: String,
    required: false,
  },
  // eslint-disable-next-line vue/require-default-prop
  copyright: {
    type: String,
    required: false,
  }
});
</script>

<template>
  <div class="image">
    <img class="image__src" :src="src" :alt="alt">
    <span v-if="copyright" class="image__credits credits">
      {{copyright}}
    </span>
  </div>
</template>

<style scoped lang="scss">
.image {
  width: 100%;
  height: 100%;
  position: relative;
  &:hover {
    .credits {
      display: block;
    }
  }
  &__src {
     width: 100%;
   }
  &__credits {
   display: none;
   position: absolute;
   left: 0;
   bottom: 0;
   background-color: var(--epj-c-main);
   padding: 7px 10px 5px 10px;
 }
}
</style>