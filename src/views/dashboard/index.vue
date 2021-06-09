<template>
  <div class="dashboard-container">
    <router-link to="/orders/create_order" class="create_order_btn">
      <div class="create_order_btn_text">Хочу наполнить бак до краев</div>
      <img src="../../assets/images/memes/think.png" class="create_order_btn_img"/>
    </router-link>
    <hr class="divider">
    <NewsPanel />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NewsPanel from '../news_panel/news_panel'
export default {
  name: 'Dashboard',
  components: {
    NewsPanel
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.create_order_btn {
  display: block;
  background: linear-gradient(45deg, #dddddd, #bbe9ff);
  box-shadow: 5px 5px 10px rgba(0,0,0,0.3), -5px -10px 20px rgba(255,255,255,0.5);
  border: #222222;
  margin: 0 auto;
  width: 220px;
  height: 160px;
  border-radius: 10px;
  display: flex;
  padding-right: 10px;
  &_text {
    margin-top: 30px;
    margin: 10px 0 0px 10px;
    font-size: 27px;
    text-align: center;
  }
  &_img {
    margin-left: -20px;
    align-self: flex-end;
    height: 87px;
  }
}
  .divider {
    margin: 50px auto;
  }
</style>
