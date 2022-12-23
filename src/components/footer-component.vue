<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer__credits">
      <router-link to="/about">
        EPJ
      </router-link>
      &
      <a href="https://jennblngr.com">
        JLB
      </a>
      © 2022
    </div>
    <div class="footer__notices">
      <router-link to="/legal-notices">
        Legal notices
      </router-link>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  color: white;
  font-family: var(--font-primary);
  font-size: 12px;
  &__credits, &__notices {
    position: fixed;
    bottom: 30px;
  }
  &__credits {
    left: 30px;
  }
  &__notices {
    right: 30px;
  }
}
</style>
