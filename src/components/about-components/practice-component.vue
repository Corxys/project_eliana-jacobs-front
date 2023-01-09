<script setup>
// Components
import ImageCustomComponent from "../image-custom-component.vue";

// Props
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
      <image-custom-component
        :image="practice.attributes.image"
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
	display: flex;
	flex-wrap: wrap;
	&__container {
		width: 100%;
	}
	:deep(.image) {
		margin-bottom: 30px;
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
	}
}
</style>
