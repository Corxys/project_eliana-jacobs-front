<script setup>
/* eslint-disable max-len */
// Disable max length error on line 71 and 110.

/**
 * @property {string} street
 * @property {string} city
 * @property {string} website
 * @property {string} publishedAt
 **/

// General
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {marked} from "marked";

// Images
import shapeBottom from "@/assets/images/article_shape-01.png";

// Icons
import scheduleIcon from "@/assets/icons/schedule.svg";
import localisationIcon from "@/assets/icons/localisation.svg";
import emailIcon from "@/assets/icons/email.svg";
import linkIcon from "@/assets/icons/link.svg";

// Utils
import {formatDate} from "@/utils/formatDate";
import {formatHour} from "@/utils/formatHour";

// Components
import ButtonCustomComponent from "@/components/shared-components/button-custom-component.vue";
import ImageCustomComponent from "@/components/image-custom-component.vue";
import ArrowBackComponent from "@/components/arrow-back-component.vue";

// Hook call
const store = useStore();
const router = useRouter();

// State
const article = computed(() => store.state.article);
</script>

<template>
  <section class="article">
    <img class="article__shape article__shape-01" :src="shapeBottom" alt="Shape in the bottom of the site.">
    <div class="article__container">
      <arrow-back-component :on-click="router.back" />
      <div class="article__header">
        <h1 class="article__header-title">
          {{article.attributes.title}}
        </h1>
        <div class="article__header-date">
          Posted
          <br>
          {{formatDate(article.attributes.publishedAt)}}
        </div>
      </div>
      <div class="article__content">
        <div class="article__sidebar">
          <p class="article__sidebar-text" v-html="marked.parse(article.attributes.text)" />
          <div class="article__sidebar-details">
            <div class="article__sidebar-detail">
              <img class="article__sidebar-icon" :src="scheduleIcon" alt="Schedule">
              <div class="article__sidebar-info">
                {{formatDate(article.attributes.date.date)}}, {{formatHour(article.attributes.date.start)}} to {{formatHour(article.attributes.date.end)}}
              </div>
            </div>
            <div class="article__sidebar-detail">
              <img class="article__sidebar-icon" :src="localisationIcon" alt="Pin">
              <a :href="'https://maps.google.com/?q=' + (article.attributes.address.name ? article.attributes.address.name + ', ' : '') + article.attributes.address.street + ', ' + article.attributes.address.cp + ', ' + article.attributes.address.city" target="_blank">
                <div class="article__sidebar-info">
                  {{article.attributes.address.name ? article.attributes.address.name + ", " : ""}}
                  {{article.attributes.address.street}},
                  {{article.attributes.address.cp}}
                  {{article.attributes.address.city}}
                </div>
              </a>
            </div>
            <div v-if="article.attributes.email" class="article__sidebar-detail">
              <img class="article__sidebar-icon" :src="emailIcon" alt="Envelop">
              <a :href="`mailto:${article.attributes.email}`">
                <div class="article__sidebar-info">
                  {{article.attributes.email}}
                </div>
              </a>
            </div>
          </div>
          <button-custom-component v-if="article.attributes.register" text="Register by email" :link="'mailto:' + article.attributes.register.email" :external="true" />
          <div v-if="article.attributes.website" class="article__sidebar-link">
            <img class="article__sidebar-icon" :src="linkIcon" alt="Link chain">
            <a class="article__sidebar-info" href="/">
              {{article.attributes.website}}
            </a>
          </div>
        </div>
        <div v-if="article.attributes.image.src.data.attributes" class="article__image">
          <image-custom-component
            :image="article.attributes.image"
            :copyright="article.attributes.image.copyright"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.article {
	padding: var(--container-padding);
	background: radial-gradient(circle at 81.06% 22.22%, #110F10, transparent 80%),radial-gradient(circle at 0.33% 9.55%, #110F10, transparent 60%),radial-gradient(circle at 79% 46%, #110F10, transparent 90%),radial-gradient(circle at 95.11% 84.11%, #110F10, transparent 100%),radial-gradient(circle at 63% 90.45%, #205251, transparent 31%),radial-gradient(circle at 50% 50%, #205251, #205251 100%);
	&__container {
		z-index: 10;
		position: relative;
	}
	&__header {
    display: flex;
    justify-content: space-between;
		flex-direction: column;
    margin-bottom: var(--spacing-between-vertical-elements);
    &-title {
      margin-bottom: 30px;
    }
    &-date {
      white-space: nowrap;
      line-height: 1.2rem;
			margin-bottom: 30px;
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
	&__shape {
		position: absolute;
		width: 80%;
		max-width: 617px;
		&-01 {
			bottom: 0;
			left: 0;
		}
	}
}

@media (min-width: 768px) {
	.article {
		&__content {
			flex-direction: row;
		}
		&__header {
			flex-direction: row;
			&-title {
				max-width: 80%;
				hyphens: auto;
				white-space: pre-line;
			}
			&-date {
				margin-left: 50px;
				margin-bottom: 0;
				text-align: right;
				margin-top: 7px;
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
