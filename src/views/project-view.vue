<script setup>
import {ref, computed, watch, inject} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {marked} from "marked";

import ArrowBackComponent from "@/components/shared-components/arrow-back-component.vue";
import MediaComponent from "@/components/shared-components/media-component.vue";
import GalleryComponent from "@/components/shared-components/gallery-component.vue";
import {slugifyString} from "@/utils/slugify";

const store = useStore();
const route = useRoute();
const router = useRouter();

const projectDate = computed(() => project.value.date);

let indexOfFocusedImage = ref(0);

const colorTheme = inject("colorTheme");

const projects = computed(() => store.state.projects);

const changeImageFocused = ({index}) => {
  indexOfFocusedImage.value = index;
};
const backOnProjectsPage = async () => {
	await store.dispatch("setHasTransitionScreen",  false);

  await store.dispatch("setCategory", projects.value[store.state.selected.project].category);

	await router.push(`/projects/${store.state.selected.category}`);
};

// Un-displays the image on preview if we return in the project page.
watch(() => route, () => {
	store.dispatch("setImageOnPreview", false);
}, {"deep": true, "immediate": true});

// Retrieve the content of the targeted project with the slug.
const project = computed(() => {
  if (!projects.value) {
    return null;
  }

  store.commit("setProject", route.params.slug);

  return projects.value[route.params.slug];
});
</script>

<template>
  <section class="project" :class="{'project--dark': colorTheme === 'dark'}">
    <div v-if="project">
      <arrow-back-component :on-click="backOnProjectsPage" />

      <div class="project__container">
        <div class="project__content">
          <h1 class="project__title">
            {{project.name}}
          </h1>

          <div class="project__date">
            {{projectDate}}
          </div>
          <p
            v-if="project.text"
            class="project__text"
            v-html="marked.parse(project.text)"
          />

          <div v-if="project.medias.length > 1" class="project__images">
            <gallery-component
              :images="project.medias"
              :on-click="changeImageFocused"
            />
          </div>
        </div>

        <div v-if="project.medias[indexOfFocusedImage]" class="project__highlight">
          <media-component
            :media="project.medias[indexOfFocusedImage]"
            :copyright="project.medias[indexOfFocusedImage].copyright"
            :has-preview="true"
          />
        </div>
      </div>
    </div>

    <!-- Placeholder for the project page. -->
    <div v-else>
      Oops, an error occurred while fetching the project.
      <br>
      Try again later, and don't hesitate to contact me if the problem persists!
    </div>
  </section>
</template>

<style scoped lang="scss">
.project {
	padding: var(--container-padding);
  background-color: var(--epj-c-white);
  color: var(--epj-c-black);

  &--dark {
    background:
      radial-gradient(circle at 27.28% 77.78%, #110F10, transparent 61%),
      radial-gradient(circle at 42.94% 50.05%, #110F10, transparent 100%),
      radial-gradient(circle at 45.89% 30.01%, #110F10, transparent 100%),
      radial-gradient(circle at 99.17% 46.73%, #205251, transparent 100%),
      radial-gradient(circle at 66.28% 54.41%, #110F10, transparent 100%),
      radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);
  }

  &__container {
    display: flex;
		flex-direction: column-reverse;
  }
  &__text {
    white-space: pre-wrap;
  }
  &__content, &__highlight {
    width: 100%;
  }
	&__title {
		margin: 30px 0;
	}
  &__date {
    margin-bottom: 30px;
  }
  &__highlight {
    height: 100%;
    margin-left: 0;
  }
}

@media (min-width: 768px) {
	.project {
		&__container {
			flex-direction: row;
		}
		&__date {
			margin-bottom: 50px;
		}
		&__content, &__highlight {
			width: 50%;
		}
		&__highlight {
			position: sticky;
			top: 30px;
			height: 100%;
			margin-left: 30px;
			:deep(.image__src) {
				cursor: pointer;
				width: 100%;
				object-fit: cover;
				object-position: top center;
			}
		}
	}
}
</style>
