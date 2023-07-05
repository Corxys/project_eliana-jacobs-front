<script setup>
import {computed, inject} from "vue";
import {useStore} from "vuex";

const {getters} = useStore();

let isMenuOpen = inject("isMenuOpen");
const lightTheme = computed(() => getters.lightTheme);

// Color theme of the navbar.
const footerColorTheme = computed(() => {
  return lightTheme.value || lightTheme.value && isMenuOpen.value;
});
</script>

<template>
  <footer
    class="footer"
    :class="{'footer--light': footerColorTheme}"
  >
    <!-- Credits -->
    <div class="footer__credits">
      <router-link to="/about">
        EPJ
      </router-link>
      & JLB © 2022
    </div>

    <!-- Legal notices -->
    <div class="footer__notices">
      <router-link to="/legal-notices">
        Legal notices
      </router-link>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
	width: 100vw;
	display: flex;
	justify-content: space-between;
  font-size: 12px;
  font-family: var(--font-primary);

  // Light theme
  &--light {
    color: var(--color-text-light);
  }

  // Credits and legal notices
  &__credits, &__notices {
    position: absolute;
		bottom: 30px;
		z-index: 150;
  }

  // Credits
  &__credits {
    left: 30px;
  }

  // Legal notices
  &__notices {
    right: 30px;
  }
}

// Responsive desktop
@media (min-width: 768px) {
	.footer {
		&__credits, &__notices {
			position: fixed;
		}
	}
}
</style>
