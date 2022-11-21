<script setup>
// General
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {marked} from "marked";

// Hook call
const store = useStore();
const router = useRouter();

// Store
const project = computed(() => store.state.project);
</script>

<template>
  <section class="project">
    <!-- TODO: transform to a reusable component; attention, quand on clique dessus ça renvoie vers la page de transition alors que ça devrait pas UwU -->
    <div class="project__back" @click="router.back()">
      <div class="project__back-arrow" />
      <div class="project__back-text">
        Back
      </div>
    </div>
    <div class="project__content">
      <!-- TODO: rename this class (gallery c'est pour les images par pour le contenu textuel) -->
      <div class="project__gallery">
        <h1 class="project__title">
          {{project.attributes.name}}
        </h1>
        <div class="project__date">
          {{project.attributes.date.slice(0, 4)}}
        </div>
        <p class="project__text" v-html="marked.parse(project.attributes.text)" />
        <p class="project__text" v-html="marked.parse(project.attributes.text)" />

        <p class="project__text" v-html="marked.parse(project.attributes.text)" />

        <p class="project__text" v-html="marked.parse(project.attributes.text)" />

        <p class="project__text" v-html="marked.parse(project.attributes.text)" />
        <p class="project__text" v-html="marked.parse(project.attributes.text)" />
        <p class="project__text" v-html="marked.parse(project.attributes.text)" />
        <p class="project__text" v-html="marked.parse(project.attributes.text)" />
        <p class="project__text" v-html="marked.parse(project.attributes.text)" />

        <div v-if="project.attributes.medias.length > 1" class="project__images">
          <div v-for="media of project.attributes.medias" :key="media.id" class="project__image">
            <img
              :src="media.src.data.attributes.url ? media.src.data.attributes.url : ''"
              :alt="media.src.data.attributes.alt ? media.src.data.attributes.alt : ''"
            >
          </div>
        </div>
      </div>
      <div class="project__highlight">
        <img
          :src="project.attributes.medias[0].src.data.attributes.url ? project.attributes.medias[0].src.data.attributes.url : ''"
          :alt="project.attributes.medias[0].src.data.attributes.alt ? project.attributes.medias[0].src.data.attributes.alt : ''"
        >
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project {
  padding-bottom: 0;
  &__back {
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 30px;
    &:hover {
      .article__back-arrow {
        left: -5px;
      }
    }
    &-text {
      padding-left: 17px;
    }
    &-arrow {
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
  &__text {
    white-space: pre-wrap;
  }
  &__content {
    display: flex;
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
    height: 100%;
    margin-bottom: 105px;
    margin-left: 30px;
    // TODO: check why the sticky don't works
    img {
      position: sticky;
      width: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }
}
</style>
