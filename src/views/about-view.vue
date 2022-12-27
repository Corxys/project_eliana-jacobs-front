<script setup>
// General
import {useStore} from "vuex";
import {computed} from "vue";

// Components
import IconSocial from "../components/shared-components/icon-social-component.vue";
import ButtonCustom from "../components/shared-components/custom-button-component.vue";
import Practice from "../components/about-components/practice-component.vue";

// Images
import shapeTopRight from "../assets/images/about_shape-01.png";
import shapeBottomLeft from "../assets/images/about_shape-02.png";

// Hook call
const store = useStore();

// State
const practices = computed(() => store.state.practices);
</script>

<template>
  <section class="about">
    <img class="about__shape about__shape-01" :src="shapeTopRight">
    <img class="about__shape about__shape-02" :src="shapeBottomLeft">
    <div class="about__container">
      <header class="about__header">
        <h1 class="about__title">
          Eliana is a performance, circus, visual and conceptual artist and singer.
        </h1>
        <div class="about__buttons">
          <icon-social :icon="['fab', 'instagram']" link="https://www.instagram.com/__e_l_i_a_n_a__/" />
          <icon-social :icon="['fab', 'youtube']" link="https://www.youtube.com/channel/UC7Og5-qT_0Oucnraj2f51VQ" />
          <button-custom text="Contact me" link="/contact" :external="false" />
          <button-custom text="Download my CV" link="/" :external="true" />
        </div>
      </header>
      <article class="about__content">
        <h2 class="about__subtitle">
          Practices
        </h2>
        <div class="about__practices">
          <practice v-for="practice of practices" :key="practice.id" :practice="practice" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  padding-top: 130px;
  padding-bottom: 130px;
	background: radial-gradient(circle at 1.39% 92.63%, #110F10, transparent 30%),radial-gradient(circle at 51.11% 4.47%, #110F10, transparent 100%),radial-gradient(circle at 87.39% 82.76%, #110F10, transparent 100%),radial-gradient(circle at 32.5% 59.81%, #205251, transparent 100%),radial-gradient(circle at 74.72% 29.6%, #110F10, transparent 100%),radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);
  &__header {
    position: relative;
    z-index: 10;
    margin-bottom: var(--spacing-box-section);
    padding-bottom: var(--spacing-box-section);
    border-bottom: 1px solid var(--epj-c-white);
  }
  &__content {
    position: relative;
    z-index: 10;
  }
  &__buttons {
    display: flex;
    :deep(.icon-social) {
      margin-right: var(--spacing-between-buttons);
    }
    :deep(.button) {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__subtitle {
    margin-bottom: var(--spacing-subtitle-medium);
  }
  :deep(.practice) {
    &:last-child {
      margin-bottom: 0;
    }
  }

	&__shape {
		position: absolute;
		&-01 {
			width: 520px;
			right: -100px;
			top: 270px;
		}
		&-02 {
			width: 870px;
			top: 135%;
			left: -40px;
		}
	}
}
</style>
