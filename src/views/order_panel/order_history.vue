<template>
  <div class="order_history">
    <h1 class="title">История заказов</h1>
    <el-table
      v-loading="listLoading"
      :data="list"
      class="order-table"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column
        prop="id"
        label="Id"
        width="40px"
      />
      <el-table-column
        prop="createDate"
        label="Дата заказа"
        width="130px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ formatDateComp(scope.row.createDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="fuelName"
        label="Топливо"
        width="100px"
      />
      <el-table-column
        prop="price"
        label="Цена"
        width="70px"
      />
      <el-table-column
        prop="discount"
        label="Скидка"
        width="70px"
      />
      <el-table-column
        prop="value"
        label="Объем"
        width="70px"
      />
      <el-table-column
        prop="sum"
        label="Стоимость"
        width="100px"
      />
      <el-table-column
        prop="stationName"
        label="Станция"
        width="240px"
      />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, byField } from '../../utils/index'
import ApiService from '../../api/services'
const apiService = new ApiService()

export default {
  name: 'OrderHistory',
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'ORDERS'
    ])
  },
  created() {
    // получаем все заказы с сервера при рендеринге
    this.fetchOrders()
  },
  methods: {
    // получаем заказы с сервера
    fetchOrders() {
      this.listLoading = true
      apiService.getOrdersOfUser(sessionStorage.getItem('username')).then(response => {
        this.list = response.data.sort(byField('id'))
        this.listLoading = false
      })
    },
    formatDateComp(item) {
      if (item) {
        return formatDate(item)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  padding-bottom: 30px;
}
  .order_history {
    display: block;
    margin: 60px auto;
    width: 821px;
  }
</style>
