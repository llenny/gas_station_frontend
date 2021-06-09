<template>
  <div class="delivery-history">
    <h1 class="title">История заявок</h1>
      <el-table
        v-loading="listLoading"
        :data="list"
        class="delivery-history-table"
        element-loading-text="Loading"
        border
        highlight-current-row
      >
        <el-table-column prop="id" label="Id" />
        <el-table-column prop="createDate" label="Дата подачи заявки">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ formatDateComp(scope.row.createDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="Стоимость" />
        <el-table-column prop="status" label="Статус" width="120px">
        <template scope="scope">
          <span v-if="scope.row.status">
            Завершена
          </span>
          <span v-else>
            Не завершена
          </span>
        </template>
      </el-table-column>
      <el-table-column>
        <template scope="scope">
          <el-button
            v-if="!scope.row.status"
            icon="el-icon-check"
            type="success"
            plain
            size="mini"
            @click="takeDelivery(scope.row.id)"
          >
            Принять
          </el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template scope="scope">
          <el-button
            icon="el-icon-info"
            type="primary"
            circle
            size="mini"
            @click="fetchDeliveryItems(scope.row.id)"
          />
          <DeliveryInfo
            v-if="modal"
            :deliveryItemsApi="deliveryItems"
            @closeModal="closeModal"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DeliveryInfo from './delivery_info'
import { formatDate } from '../../utils/index'
import ApiService from '../../api/services'
const apiService = new ApiService()
import { byField } from '../../utils'
export default {
  name: 'DeliveryHistory',
  components: {
    DeliveryInfo
  },
  data() {
    return {
      list: null,
      listLoading: false,
      deliveryItems: [],
      filteredDeliveryItems: [],
      modal: false
    }
  },
  computed: {
    ...mapGetters([
      'DELIVERIES'
    ])
  },
  created() {
    // получаем все заявки с сервера при рендеринге
    this.fetchDeliveries()
  },
  methods: {
    ...mapActions([
      'TAKE_DELIVERY'
    ]),
    // получаем заявки с сервера
    fetchDeliveries() {
      this.listLoading = true
      apiService.getDeliveries().then(response => {
        this.list = response.data.sort(byField('id'))
        this.listLoading = false
      })
    },
    // принятие заявки
    takeDelivery(index) {
      const sendDelivery = index
      // передаем id заявки, которую нужно принять и id принявшего сотрудника
      apiService.takeDelivery(index, sendDelivery)
        .then(response => {
        console.log(response)
      })
        .catch(err => { console.log(err) })
      this.$message('Поставка принята успешно!')
    },
    // получение всех единиц по выбранной заявке
    fetchDeliveryItems(id) {
      this.listLoading = true
      apiService.getDeliveryItemsOfDelivery(id).then(response => {
        this.deliveryItems = response.data
        this.listLoading = false
      })
      this.modal = true
    },
    // фильтруем единицы заявок по id той, которую хотим показать
    filterDeliveryItems(index) {
      this.filteredDeliveryItems = this.deliveryItems.filter(deliveryItem => deliveryItem.deliveryId === index)
      console.log(index)
      this.modal = true
    },
    closeModal() {
      this.modal = false
      this.deliveryItems = []
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
}
.delivery-history {
  display: block;
  width: 90%;
  margin: 0 auto;
}
</style>
