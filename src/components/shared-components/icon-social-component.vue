<script setup>
defineProps({
  icon: {
    type: Array,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="icon-social">
    <a :href="link" target="_blank">
      <font-awesome-icon :icon="icon" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.icon-social {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-button-background-default);
  border: 1px solid var(--color-button-background-default);
  border-radius: 50%;
  width: 31.59px;
  height: 31.59px;
  transition: 0.2s ease-in all;
  &:hover {
    background-color: var(--color-button-background-hover);
    border: 1px solid var(--color-button-border-hover);
  }
}
</style>
