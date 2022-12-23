<script setup>
// General
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {marked} from "marked";

// Icons
import scheduleIcon from "../assets/icons/schedule.svg";
import localisationIcon from "../assets/icons/localisation.svg";
import emailIcon from "../assets/icons/email.svg";
import linkIcon from "../assets/icons/link.svg";

// Utils
import {formatDate} from "@/utils/formatDate";
import {formatHour} from "@/utils/formatHour";

// Components
import ButtonCustom from "../components/shared-components/custom-button-component.vue";
import ImageCustom from "../components/image-custom-component.vue";

// Hook call
const store = useStore();
const router = useRouter();

// State
const article = computed(() => store.state.article);
</script>

<template>
  <div class="article">
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
            <img class="article__sidebar-icon" :src="scheduleIcon">
            <div class="article__sidebar-info">
              {{formatDate(article.attributes.date.date)}}, {{formatHour(article.attributes.date.start)}} to {{formatHour(article.attributes.date.end)}}
            </div>
          </div>
          <div class="article__sidebar-detail">
            <img class="article__sidebar-icon" :src="localisationIcon">
            <!-- eslint-disable-next-line max-len -->
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
            <img class="article__sidebar-icon" :src="emailIcon">
            <a :href="`mailto:${article.attributes.email}`">
              <div class="article__sidebar-info">
                {{article.attributes.email}}
              </div>
            </a>
          </div>
        </div>
        <!-- TODO: check if external URL as email or link and adjust the href used -->
        <button-custom v-if="article.attributes.register" text="Register by email" :link="'mailto:' + article.attributes.register.email" :external="true" />
        <div v-if="article.attributes.website" class="article__sidebar-link">
          <img class="article__sidebar-icon" :src="linkIcon">
          <a class="article__sidebar-info" href="/">
            {{article.attributes.website}}
          </a>
        </div>
      </div>
      <div class="article__image">
        <image-custom
          :src="article.attributes.image.src.data.attributes.url"
          :alt="article.attributes.image.src.data.attributes.alternativeText"
          :copyright="article.attributes.image.copyright"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article {
	padding-top: 130px;
  padding-bottom: 130px;
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-between-vertical-elements);
    &-title {
      margin-bottom: 0;
    }
    &-date {
      margin-left: 50px;
      white-space: nowrap;
      text-align: right;
      margin-top: 7px;
      line-height: 1.2rem;
    }
  }
  &__content {
    display: flex;
  }
  &__sidebar {
    width: 50%;
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
    width: 50%;
    margin-left: 15px;
    &-src {
      position: sticky;
      top: 0;
      width: 100%;
      object-fit: contain;
      object-position: top;
    }
  }
}
</style>
