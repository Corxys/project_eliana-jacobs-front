<script setup>
// General
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

// Utils
import {formatDate} from "../utils/formatDate.js";

// Components
import ButtonCustom from "../components/shared-components/custom-button-component.vue";

// Hook call
const store = useStore();
const router = useRouter();

// State
const article = computed(() => store.state.article);
</script>

<template>
  <div class="article">
    <div class="article__back" @click="router.back()">
      Back
    </div>
    <div class="article__header">
      <h1 class="article__header-title">
        {{article.attributes.title}}
      </h1>
      <div class="article__header-date">
        Posted
        <br>
        {{formatDate(article.attributes.posted)}}
      </div>
    </div>
    <div class="article__content">
      <div class="article__sidebar">
        <p class="article__sidebar-text">
          {{article.attributes.text}}
        </p>
        <div class="article__sidebar-details">
          <div class="article__sidebar-detail">
            <img class="article__sidebar-icon" src="/" alt="">
            <div class="article__sidebar-info">
              {{article.attributes.date}}
            </div>
          </div>
          <div class="article__sidebar-detail">
            <img class="article__sidebar-icon" src="/" alt="">
            <div class="article__sidebar-info">
              {{article.attributes.localisation}}
            </div>
          </div>
          <div class="article__sidebar-detail">
            <img class="article__sidebar-icon" src="/" alt="">
            <div class="article__sidebar-info">
              {{article.attributes.mail}}
            </div>
          </div>
        </div>
        <button-custom text="Register by mail" link="/" :external="true" />
        <div v-if="article.attributes.website" class="article__sidebar-link">
          <img class="article__sidebar-icon" src="/" alt="">
          <a class="article__sidebar-info" href="/">
            {{article.attributes.website}}
          </a>
        </div>
      </div>
      <div class="article__image">
        <img class="article__image-src" alt="" :src="`http://localhost:1337${article.attributes.image.data.attributes.url}`">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article {
  padding-bottom: 0;
  &__back {
    cursor: pointer;
  }
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
    background-color: red;
    width: 50%;
    margin-right: 15px;
    &-text {
      white-space: break-spaces;
    }
    &-detail, &-link {
      display: flex;
      margin: 10px 0;
    }
    &-icon {
      width: 20px;
      height: 20px;
      background-color: white;
      margin-right: 10px;
    }
  }
  &__image {
    background-color: blue;
    width: 50%;
    margin-left: 15px;
  }
}
</style>
