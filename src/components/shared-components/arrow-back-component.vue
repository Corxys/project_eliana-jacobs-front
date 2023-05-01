<script setup>
import {inject} from "vue";

// Props
defineProps({
	"onClick": {
		"type": Function,
		"required": true,
	}
});

// Inject
const colorTheme = inject("colorTheme");
</script>

<template>
  <div
    class="arrow-back"
    :class="colorTheme === 'dark' ? '' : 'arrow-back--light'"
    @click="onClick"
  >
    <div class="arrow-back__body" />
    <div class="arrow-back__text">
      Back
    </div>
  </div>
</template>

<style scoped lang="scss">
.arrow-back {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
	&--light {
		.arrow-back__body {
			border-top: 2px solid var(--epj-c-black);
			border-right: 2px solid var(--epj-c-black);
		}
	}
  &:hover {
    .arrow-back__body {
      left: -5px;
    }
  }
  &__text {
    padding-left: 17px;
  }
  &__body {
    position: absolute;
    left: 0;
    bottom: 5px;
    height: 8px;
    width: 8px;
    border-top: 2px solid var(--epj-c-white);
    border-right: 2px solid var(--epj-c-white);
    transform: rotate(-135deg);
    transition: left .2s ease-in-out;
  }
}
</style>
