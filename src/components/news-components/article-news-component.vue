<script setup>
// General
import {useStore} from "vuex";
import {useRouter} from "vue-router";

// Utils
import {formatDate} from "../../utils/formatDate.js";
import {slugifyTitle} from "../../utils/slugifyTitle.js";

// Hook call
const store = useStore();
const router = useRouter();

// Props
defineProps({
  type: {
    type: String,
    required: true,
  },
  article: {
    type: Object,
    required: true,
  },
});

// Actions
const getArticle = (article) => {
  store.commit("setArticle", {id: article.id});
  router.push(`/article/${slugifyTitle(article.attributes.title)}`);
};
</script>

<template>
  <div v-if="type === 'small'" class="news-article--small">
    <div class="link--image" @click="getArticle(article)" />
    <!--    <router-link class="link&#45;&#45;image" :to="`/article/${slugifyTitle(article.attributes.title)}`">-->
    <!--      &lt;!&ndash;      <img class="image" :src="`http://localhost:1337${article.attributes.image.data.attributes.url}`" alt="/">&ndash;&gt;-->
    <!--    </router-link>-->
    <div class="content">
      <h4 class="title" @click="getArticle(article)">
        {{article.attributes.title}}
      </h4>
      <div class="date">
        {{formatDate(article.attributes.posted)}}
      </div>
    </div>
  </div>
  <div v-if="type === 'medium'" class="news-article--medium">
    <div class="link--image" @click="getArticle(article)">
      <img class="image" :src="`http://localhost:1337${article.attributes.image.data.attributes.url}`" alt="">
    </div>
    <div class="content">
      <h4 class="title" @click="getArticle(article)">
        {{article.attributes.title}}
      </h4>
      <div class="date">
        {{formatDate(article.attributes.posted)}}
      </div>
    </div>
  </div>
  <div v-if="type === 'large'" class="news-article--large">
    <div class="link--image" @click="getArticle(article)" />
    <!--    <router-link class="link&#45;&#45;image" :to="`/article/${slugifyTitle(article.attributes.title)}`">-->
    <!--      <img class="image" :src="`http://localhost:1337${article.attributes.image.data.attributes.url}`" alt="/">-->
    <!--    </router-link>-->
    <div class="content">
      <h3 class="title" @click="getArticle(article)">
        {{article.attributes.title}}
      </h3>
      <div class="date">
        {{formatDate(article.attributes.posted)}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.link--image, .title {
  cursor: pointer;
}
// News article (small)
.news-article--small {
  display: flex;
  margin-bottom: 30px;
  height: calc(100% / 3);
  .link--image {
    min-width: 50%;
    width: 50%;
    height: 100%;
    background-color: white;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    margin-left: 10px;
  }
}

// News article (medium)
.news-article--medium {
  margin-bottom: 30px;
  .image {
    width: 100%;
    height: 100%;
    max-height: 245px;
    object-fit: cover;
  }
  .title {
    margin: 10px 0 5px 0;
  }
}

// News article (large)
.news-article--large {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--epj-c-white);
  padding: 5px;
  height: 100%;
  .link--image {
    height: 100%;
    background-color: white;
  }
  .image {
    height: 100%;
    width: 100%;
    object-fit: cover;

  }
  .content {
    margin-top: 10px;
  }
}
</style>
