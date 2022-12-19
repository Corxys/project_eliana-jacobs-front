<script setup>
/*
* TODO:
*  - animation on image hovered (scale)
*  - fix height of the three elements in the column
*/

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
    <div class="image" @click="getArticle(article)" />
    <div class="content">
      <h4 class="title" @click="getArticle(article)">
        <span>
          {{article.attributes.title}}
        </span>
      </h4>
      <div class="date">
        {{formatDate(article.attributes.publishedAt)}}
      </div>
    </div>
  </div>
  <div v-if="type === 'medium'" class="news-article--medium">
    <div class="link--image" @click="getArticle(article)">
      <img class="image" :src="article.attributes.image.src.data.attributes.url" alt="">
    </div>
    <div class="content">
      <h4 class="title" @click="getArticle(article)">
        <span>
          {{article.attributes.title}}
        </span>
      </h4>
      <div class="date">
        {{formatDate(article.attributes.publishedAt)}}
      </div>
    </div>
  </div>
  <div v-if="type === 'large'" class="news-article--large">
    <div class="link--image" @click="getArticle(article)">
      <img class="image" :src="article.attributes.image.src.data.attributes.url" alt="/">
    </div>
    <div class="content">
      <h3 class="title">
        <span @click="getArticle(article)">
          {{article.attributes.title}}
        </span>
      </h3>
      <div class="date">
        {{formatDate(article.attributes.publishedAt)}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image, .link--image, .title > span {
  cursor: pointer;
}
// News article (small)
.news-article--small {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  .link--image {
    grid-area: 1 / 1 / 2 / 2;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: white;
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content;
  grid-area: 1 / 1 / 4 / 2;
  height: 450px;
  padding: 5px;
  border: 1px solid var(--epj-c-white);
  .link--image {
    grid-area: 1 / 1 / 3 / 2;
    overflow: hidden;
  }
  .image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
  .content {
    margin-top: 5px;
  }
}
</style>
