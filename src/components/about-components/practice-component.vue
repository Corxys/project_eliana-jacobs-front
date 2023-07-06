<script setup>
/**
 * @property {Object} practice
 * @property {Object} practice.image Image that symbolizes the practice.
 * @property {string} practice.image.copyright Credits photographer.
 * @property {string} practice.title Title of the practice.
 * @property {string} practice.text Text that gives details about the practice.
 **/

import MediaComponent from "@/components/shared-components/media-component.vue";

defineProps({
  "practice": {
    "type": Object,
    "required": true,
  },
});
</script>

<template>
  <div class="practice">
    <div v-if="practice" class="practice__container">
      <media-component :media="practice.image" />
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
	display: flex;
	flex-wrap: wrap;

	&__container {
		width: 100%;
	}

	:deep(.image) {
		width: 100%;
	}

  &__text {
    white-space: pre-line;
  }
}

@media (min-width: 768px) {
	.practice {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		column-gap: var(--margin-x-elements);
		margin-bottom: var(--margin-y-elements);

		&__container {
			grid-column: 1 / 4;
			margin-right: var(--margin-x-elements);
			width: 100%;
		}

		&__content {
			grid-column: 4 / -1;
		}
	}
}
</style>
