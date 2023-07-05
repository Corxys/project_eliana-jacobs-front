<script setup>
import {computed} from "vue";
import {useStore} from "vuex";

const {getters} = useStore();

defineProps({
	"onClick": {
		"type": Function,
		"required": true,
	}
});

const lightTheme = computed(() => getters.lightTheme);
</script>

<template>
  <div
    class="arrow-back"
    :class="{'arrow-back--light': lightTheme}"
  >
    <div class="arrow-back__body" />
    <div class="arrow-back__text" @click="onClick">
      Back
    </div>
  </div>
</template>

<style scoped lang="scss">
.arrow-back {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 30px;

	&--light {
		.arrow-back__body {
			border-top: 2px solid var(--color-black);
			border-right: 2px solid var(--color-black);
		}
	}

  &:hover {
    .arrow-back__body {
      left: -5px;
    }
  }

  &__text {
    cursor: pointer;
    padding-left: 17px;
  }

  &__body {
    position: absolute;
    left: 0;
    bottom: 5px;
    height: 8px;
    width: 8px;
    border-top: 2px solid var(--color-white);
    border-right: 2px solid var(--color-white);
    transform: rotate(-135deg);
    transition: left .2s ease-in-out;
  }
}
</style>
