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
	position: absolute;
	bottom: 0;
	width: 100vw;
	height: 30px;
	display: flex;
	justify-content: space-between;
  color: white;
  font-family: var(--font-primary);
  font-size: 12px;
  &__credits, &__notices {
    position: absolute;
		z-index: 150;
  }
  &__credits {
    left: 30px;
  }
  &__notices {
    right: 30px;
  }
}

@media (min-width: 768px) {
	.footer {
		&__credits, &__notices {
			position: fixed;
		}
	}
}
</style>
