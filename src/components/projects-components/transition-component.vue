<script setup>
/**
 * @property {Object} types All types
 * @property {number} types.length Length of the types Array
 * @property {Object} type One type
 * @property {string} type.id ID of a type
 * @property {string} type.name Name of a type
 * @property {string} type.image Image used for the type
 * @property {string} alternativeText
 **/

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
        :style="`width: calc(100vw / ${types.length}); height: calc(100vh / ${types.length})`"
      >
        <div v-if="type" class="transition__filter-image" @click="emit('selectFilter', type.name)">
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
	height: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
	padding: var(--container-padding);

	&__filters {
    display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30px;
		height: 100vh;
		width: 100vw;
  }

  &__filter {
    margin-bottom: 30px;
		display: flex;
		flex-direction: column;
		width: 100%;

		&:last-child {
			margin-bottom: 0;
		}

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
