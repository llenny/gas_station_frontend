<template>
  <div>
    <div class="news_item">
      <img :src="item.image" class="news_item_img">
      <div class="news_item_block">
        <div class="news_item_title">
          {{ item.title }}
        </div>
        <div class="news_item_descr">
          {{ item.descr }}
        </div>
      </div>
    </div>
    <hr class="news_item_divider">
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
.news_item {
  margin-top: 40px;
  margin-left: 50px;
  display: flex;
  &_img {
    max-width: 250px;
    max-height: 300px;
  }
  &_block {
    display: flex;
    flex-direction: column;
    margin-left: 40px;
  }
  &_title {
    font-size: 20px;
    font-weight: bold;
  }
  &_descr {
    margin-top: 30px;
  }
  &_divider {
    margin-top: 40px;
  }
}
</style>
