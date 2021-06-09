<template>
  <div class="container">
    <h1 class="news_panel_title">Новостная лента</h1>
    <NewsItem
      v-for="item in NEWS"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NewsItem from './news_item'
export default {
  name: 'NewsPanel',
  components: {
    NewsItem
  },
  computed: {
    ...mapGetters([
      'NEWS'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss">
.news_panel {
  &_title {
    text-align: center;
  }
}
</style>
