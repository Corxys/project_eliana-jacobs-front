<script setup>
import {ref} from "vue";

/**
 * @property {Object} types All types
 * @property {number} types.length Length of the types Array
 * @property {Object} type One type
 * @property {string} type.id ID of a type
 * @property {string} type.name Name of a type
 * @property {string} type.image Image used for the type
 * @property {string} alternativeText
 **/

const props = defineProps({
  "types": {
    "type": Array,
    "required": true,
  },
});
const typesLength = ref(props.types.length);

const emit = defineEmits(["selectFilter"]);
</script>

<template>
  <div class="transition">
    <div class="transition__filters">
      <div
        v-for="type of types"
        :key="type.id"
        class="transition__filter"
      >
        <div
          v-if="type"
          class="transition__filter-image"
          @click="emit('selectFilter', type.name)"
        >
          <img
            class="transition__filter-src"
            :src="type.image || ''"
            alt=""
          >
        </div>
        <h2 class="transition__filter-name" @click="emit('selectFilter', type.name)">
          {{type.name}}
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.transition {
  z-index: 100;
  position: relative;
  overflow: hidden;
  width: 100vw;
  min-height: 100vh;
  background-color: var(--color-white);
  padding: var(--padding-page-mobile);

  &__filters {
    display: grid;
    grid-gap: 30px;
    grid-template-rows: repeat(v-bind(typesLength), 1fr);
    grid-template-columns: 1fr;
  }

  &__filter {
    width: 100%;

    &-image {
      cursor: pointer;
      overflow: hidden;
      width: 100%;
      height: 100%;
      max-height: 350px;
    }
    &-src {
      width: 100%;
      height: 100%;
      max-height: 350px;
      object-fit: cover;
      object-position: center;
    }
    &-name {
      cursor: pointer;
      margin-top: 15px;
      text-align: center;
      font-size: 30px;
    }
  }
}

@media (min-width: 768px) {
  .transition {
    display: flex;
    justify-content: center;
    align-items: center;

    &__filters {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(v-bind(typesLength), 1fr);
    }

    &__filter {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
