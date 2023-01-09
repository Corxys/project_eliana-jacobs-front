<script setup>
// Props
defineProps({
  "images": {
    "type": Array,
    "required": true,
  },
  onClick: {
    "type": Function,
    "required": true,
  },
});

// Regex
const mimesTypesCheck = /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/;
</script>

<template>
  <div class="gallery">
    <div v-for="(image, index) of images" :key="image.id" class="gallery__image">
      <img
        v-if="mimesTypesCheck.test(image.src.data.attributes.mime)"
        :src="image.src.data.attributes.url ? image.src.data.attributes.url : ''"
        :alt="image.src.data.attributes.alternativeText ? image.src.data.attributes.alternativeText : ''"
        @click.stop="() => onClick({index})"
      >

      <!--      <video-->
      <!--        v-else-->
      <!--        class="gallery__video"-->
      <!--        :src="image.src.data.attributes.url ? image.src.data.attributes.url : ''"-->
      <!--      />-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  overflow-y: visible;
  div {
    cursor: pointer;
    flex: auto;
    height: 100px;
    min-width: 50px;
    margin: 0 8px 8px 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>
