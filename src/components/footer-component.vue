<script>
export default {
  name: "FooterComponent"
};
</script>

<template>
  <footer class="footer">
    <div class="footer__credits">
      <router-link to="/">
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
  z-index: 5;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 0 30px;
  color: white;
  font-family: var(--font-primary);
  font-size: 12px;
}
</style>
