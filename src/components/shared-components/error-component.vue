<script setup>
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();

const errorMessage = computed(() => store.state.app.errorMessage);
</script>

<template>
  <div class="error">
    <div class="error__text">
      {{errorMessage ? errorMessage : "The page you are trying to reach does not exist."}}
    </div>
  </div>
</template>

<style scoped lang="scss">
.error {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 130px 0;
  background:
    radial-gradient(circle at 27.28% 77.78%, #110F10, transparent 61%),
    radial-gradient(circle at 42.94% 50.05%, #110F10, transparent 100%),
    radial-gradient(circle at 45.89% 30.01%, #110F10, transparent 100%),
    radial-gradient(circle at 99.17% 46.73%, #205251, transparent 100%),
    radial-gradient(circle at 66.28% 54.41%, #110F10, transparent 100%),
    radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);

  &__text {
    text-align: center;
  }
}
</style>
