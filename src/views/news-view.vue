<script setup>
// General
import {computed} from "vue";
import {useStore} from "vuex";

// Components
import ArticleNews from "../components/news-components/article-news-component.vue";

// Hook call
const store = useStore();

// State
const news = computed(() => store.state.news);
</script>

<template>
  <section class="news">
    <header class="news__header">
      <h1 class="news__title">
        News
      </h1>
      <article class="news__highlight">
        <div class="news__main">
          <article-news
            v-for="article of news.slice(0, 1)"
            :key="article.id"
            :article="article"
            type="large"
          />
        </div>
        <div class="news__column">
          <article-news v-for="article of news.slice(1, 4)" :key="article.id" :article="article" type="small" />
        </div>
      </article>
    </header>
    <div class="news__all">
      <h2 class="news__subtitle">
        All news
      </h2>
      <div class="news__articles">
        <article-news v-for="article of news" :key="article.id" :article="article" type="medium" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.news {
  &__header {
    padding-bottom: var(--spacing-box-section);
    border-bottom: 1px solid var(--epj-c-white);
    margin-bottom: var(--spacing-box-section);
  }
  &__title {}
  &__highlight {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template: "sidebar mainA" "sidebar mainB";
    height: 450px;
    > :nth-child(1) {
      grid-area: sidebar;
    }
  }
  &__main {
    margin-right: 15px;
  }
  &__column {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    height: 450px;
    :deep(.news-article--small:nth-child(3)) {
      margin-bottom: 0;
    }
  }
  &__all {
    background-color: var(--color-section-background);
    padding: 30px 30px var(--spacing-section-padding-bottom) 30px;
  }
    &__articles {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: var(--spacing-between-horizontal-elements);
    }
    &__subtitle {
      margin-bottom: var(--spacing-subtitle-small);
    }
}
</style>
