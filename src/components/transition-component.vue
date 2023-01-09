<script setup>
/*
* TODO:
* - make animation on the hover (scale a bit)
*/

// Props
defineProps({
  "types": {
    "type": Array,
    "required": true,
  },
});

// Emit
const emit = defineEmits(["selectFilter"]);
</script>

<template>
  <div class="transition">
    <div class="transition__filters">
      <div
        v-for="type of types"
        :key="type.id"
        class="transition__filter"
        :style="width < 768 ? `height: calc(100% / ${types.length}); width: 100%`: `width: calc(100% / ${types.length}); height: auto`"
      >
        <div class="transition__filter-image" @click="emit('selectFilter', {'name': type.attributes.name})">
          <img
            class="transition__filter-src"
            :src="type.attributes.image.data.attributes.url ? type.attributes.image.data.attributes.url : ''"
            :alt="type.attributes.image.data.attributes.alternativeText ? type.attributes.image.data.attributes.alternativeText : ''"
          >
        </div>
        <h2 class="transition__filter-name" @click="emit('selectFilter', {'name': type.attributes.name})">
          {{type.attributes.name}}
        </h2>
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
