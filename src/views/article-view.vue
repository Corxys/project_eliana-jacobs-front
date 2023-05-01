<script setup>
/**
 * @property {Object} article
 * @property {Object} article.address Complete address of the event.
 * @property {string} article.address.name Address name of the event.
 * @property {string} article.address.street Street name of the event.
 * @property {string} article.address.city City of the event.
 * @property {string} article.website Website where to get more details about the event.
 * @property {string} article.publishedAt Publication date of the article.
 **/

import {computed} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {marked} from "marked";

import shapeBottom from "@/assets/images/shapes/article-01.png";

import scheduleIcon from "@/assets/icons/schedule.svg";
import localisationIcon from "@/assets/icons/localisation.svg";
import emailIcon from "@/assets/icons/email.svg";
import linkIcon from "@/assets/icons/link.svg";

import {formatDate} from "@/utils/formatDate";
import {formatHour} from "@/utils/formatHour";

import ButtonCustomComponent from "@/components/shared-components/button-custom-component.vue";
import MediaComponent from "@/components/shared-components/media-component.vue";
import ArrowBackComponent from "@/components/shared-components/arrow-back-component.vue";

// Hook call
const store = useStore();
const route = useRoute();
const router = useRouter();

const news = computed(() => store.state.news);

// Retrieve the content of the targeted article with the slug.
const article = computed(() => {
  if (!news.value) {
    return null;
  }

  store.dispatch("setArticle", route.params.slug);

  return news.value[route.params.slug];
});

/**
 * @name publishedAt Formatted publication date.
 **/
const publishedAt = computed(() => {
  return `Posted ${formatDate(article.value.publishedAt)}`;
});
/**
 * @name parsedText Parsed text.
 **/
const parsedText = computed(() => {
  return marked(article.value.text);
});
/**
 * @name eventDate Formatted event date.
 **/
const eventDate = computed(() => {
  return `${formatDate(article.value.date.date)}, ${formatHour(article.value.date.start)} to ${formatHour(article.value.date.end)}`;
});
/**
 * @name eventLocation Formatted event location.
 **/
const eventLocation = computed(() => {
  const addressName = article.value.address.name ? article.value.address.name + ", " : "";
  const streetName = article.value.address.street + ", ";
  const cp = article.value.address.cp + ", ";

  return `${addressName} ${streetName} ${cp} ${article.value.address.city}`;
});
/**
 * @name eventLocationLink Formatted event location link, to open Google Maps search.
 **/
const eventLocationLink = computed(() => {
  const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=";

  return GOOGLE_MAPS_LINK + eventLocation.value;
});

const backToTheNewsPage = async () => {
  await router.push("/news");
};
</script>

<template>
  <section class="article">
    <div v-if="article">
      <img
        class="article__shape"
        :src="shapeBottom"
        alt="Shape in the bottom of the site."
      >

      <div class="article__container">
        <div class="article__header">
          <arrow-back-component :on-click="backToTheNewsPage" />

          <div class="article__header-text">
            <h1 class="article__header-title">
              {{article.title}}
            </h1>

            <div class="article__header-date">
              {{publishedAt}}
            </div>
          </div>
        </div>
      </div>

      <div class="article__content">
        <div class="article__sidebar">
          <p class="article__sidebar-text" v-html="parsedText" />

          <div class="article__sidebar-details">
            <div class="article__sidebar-detail">
              <img class="article__sidebar-icon" :src="scheduleIcon" alt="Schedule">
              <div class="article__sidebar-info">
                {{eventDate}}
              </div>
            </div>

            <div class="article__sidebar-detail">
              <img class="article__sidebar-icon" :src="localisationIcon" alt="Pin">
              <a :href="eventLocationLink" target="_blank">
                <div class="article__sidebar-info">
                  {{eventLocation}}
                </div>
              </a>
            </div>

            <div v-if="article.email" class="article__sidebar-detail">
              <img class="article__sidebar-icon" :src="emailIcon" alt="Envelop">
              <a :href="`mailto:${article.email}`">
                <div class="article__sidebar-info">
                  {{article.email}}
                </div>
              </a>
            </div>
          </div>

          <button-custom-component
            v-if="article.register"
            text="Register by email"
            :link="'mailto:' + article.register.email"
            :external="true"
          />

          <div v-if="article.website" class="article__sidebar-link">
            <img class="article__sidebar-icon" :src="linkIcon" alt="Link chain">
            <a class="article__sidebar-info" href="/">
              {{article.website}}
            </a>
          </div>
        </div>

        <div class="article__image">
          <media-component
            :media="article.image"
            :copyright="article.image.copyright"
          />
        </div>
      </div>
    </div>

    <!-- Placeholder for the article page. -->
    <div v-else>
      Oops, an error occurred while fetching the article.
      <br>
      Try again later, and don't hesitate to contact me if the problem persists!
    </div>
  </section>
</template>

<style scoped lang="scss">
.article {
  min-height: 100vh;
	padding: var(--container-padding);
  background:
    radial-gradient(circle at 81.06% 22.22%, #110F10, transparent 80%),
    radial-gradient(circle at 0.33% 9.55%, #110F10, transparent 60%),
    radial-gradient(circle at 79% 46%, #110F10, transparent 90%),
    radial-gradient(circle at 95.11% 84.11%, #110F10, transparent 100%),
    radial-gradient(circle at 63% 90.45%, #205251, transparent 31%),
    radial-gradient(circle at 50% 50%, #205251, #205251 100%);

  &__shape {
    position: absolute;
    width: 80%;
    max-width: 617px;
    bottom: 0;
    left: 0;
  }

  &__container {
    z-index: 10;
    position: relative;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    &-text {
      margin-bottom: 50px;
    }

    &-title {
      margin-bottom: 15px;
    }

    &-date {
      white-space: nowrap;
      line-height: 1.2rem;
    }
  }

  &__content {
    display: flex;
    flex-direction: column-reverse;
  }

  &__sidebar {
    width: 100%;
    margin-right: 15px;

    &-text {
      white-space: break-spaces;
    }

    &-details {
      margin-bottom: 50px;
    }

    &-detail, &-link {
      display: flex;
      align-items: center;
      margin: 25px 0;
    }

    &-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  &__image {
    flex-grow: 1;
    position: sticky;
    top: 30px;
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
  }
}

@media (min-width: 768px) {
	.article {
		&__content {
			flex-direction: row;
		}

		&__header {
			&-title {
				max-width: 80%;
				hyphens: auto;
				white-space: pre-line;
			}

      &-text {
        display: flex;
        flex-direction: column;
      }

			&-date {
				margin-bottom: 0;
			}
		}

		&__sidebar, &__image {
			width: 50%;
		}

		&__image {
			margin-left: 15px;
			margin-bottom: 0;
		}
	}
}
</style>
