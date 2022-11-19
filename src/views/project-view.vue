<script setup>
// Import
import {useStore} from "vuex";
import {computed} from "vue";

// Hook call
const store = useStore();

// Store
const project = computed(() => store.state.project);

// Environment variables
const API_URL = import.meta.env.VITE_API_URL;
</script>

<template>
  <section class="project">
    <div class="project__content">
      <div class="project__gallery">
        <h1 class="project__title">
          {{project.attributes.title}}
        </h1>
        <div class="project__date">
          2022
        </div>
        <p class="project__text">
          <!--
            TODO: use Markdown parser to interpret special characters:
            See: https://randyperkins2k.medium.com/writing-a-simple-markdown-parser-using-javascript-1f2e9449a558
          -->
          {{project.attributes.text}}
        </p>
        <div v-if="project.attributes.medias.length" class="project__images">
          <div v-for="media of project.attributes.medias" :key="media.id" class="project__image">
            <img
              :src="media.src ? API_URL + media.src.data.attributes.url : ''"
              :alt="media.alt ? media.alt : ''"
            >
          </div>
        </div>
      </div>
      <div class="project__highlight">
        <img :src="circus1" alt="">
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project {
  padding-bottom: 0;
  &__text {
    white-space: pre-wrap;
  }
  &__content {
    display: flex;
    height: calc(100vh - 227px);
    overflow: hidden;
  }
  &__gallery, &__highlight {
    width: 50%;
  }
  &__images {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
    overflow-y: visible;
    div {
      flex: auto;
      height: 100px;
      min-width: 50px;
      margin: 0 8px 8px 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1);
        transition: all 0.3s ease-in-out;
      }
    }
  }
  &__highlight {
    margin-bottom: 105px;
    margin-left: 30px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }
}
</style>
