<script setup>
// Props
defineProps({
	"onClick": {
		"type": Function,
		"required": true,
	}
});
</script>

<template>
  <div class="arrow-back" @click="onClick">
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
