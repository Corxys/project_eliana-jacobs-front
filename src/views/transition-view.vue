<script setup>
// General
import {computed} from "vue";
import {useStore} from "vuex";

// Hook call
const store = useStore();

// Store
const filters = computed(() => store.state.filters.selected);
</script>

<template>
  <div class="transition">
    <div v-if="filters.length" class="transition__filters">
      <div
        v-for="filter of filters"
        :key="filter.id"
        class="transition__filter"
      >
        {{filter.attributes.image.data.attributes.url}}
        <!--        <div v-if="filter.attributes" class="transition__filter-image" @click="emit('selectFilter', {'name': filter.attributes.name})">-->
        <img
          class="transition__filter-src"
          :src="filter.attributes.image.data.attributes.url ? filter.attributes.image.data.attributes.url : ''"
          :alt="filter.attributes.image.data.attributes.alternativeText ? filter.attributes.image.data.attributes.alternativeText : ''"
        >
        <!--        </div>-->
        <!--        <h2 class="transition__filter-name" @click="emit('selectFilter', {'name': filter.attributes.name})">-->
        <!--          {{filter.attributes.name}}-->
        <!--        </h2>-->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.transition {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--epj-c-black);
  &__filters {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    height: 100vh;
  }
  &__filter {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    &-image {
      height: 100%;
      width: 100%;
      cursor: pointer;
      overflow: hidden;
    }
    &-src {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
    &__filters {
      flex-direction: row;
    }
    &__filter {
      margin-right: 30px;
      margin-bottom: 0;
      &:last-child {
        margin-right: 0;
      }
      &-image {
        height: 350px;
      }
    }
  }
}
</style>