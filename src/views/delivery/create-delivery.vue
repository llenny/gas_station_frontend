<template>
  <div class="app-container create-delivery">
    <DeliveryItem
      v-for="(item, index) in deliveryItems"
      :key="item"
      :itemId="item"
      @addDeliveryItem="addDeliveryItem"
      @deleteFromDelivery="deleteFromDelivery(index)"
      @changeDeliveryItem="changeDeliveryItem"
    />
    <div class="create_delivery_btns">
      <el-button
        class="create_delivery_btn"
        type="primary"
        plain
        @click="nextItemId"
      >
        Добавить единицу топлива
      </el-button>
      <el-button
        class="create_delivery_btn"
        type="primary"
        plain
        @click="showSummaryDelivery"
      >
        Отправить заявку
      </el-button>
    </div>
    <CreateDeliveryEnd
      v-if="modal"
      @confirmDelivery="confirmDelivery"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import DeliveryItem from './delivery-item'
import CreateDeliveryEnd from './create_delivery_end'
import { mapActions, mapGetters } from 'vuex'
import ApiService from '../../api/services'
const apiService = new ApiService()

export default {
  name: 'CreateDelivery',
  components: {
    DeliveryItem,
    CreateDeliveryEnd
  },
  props: {
    deliveryData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      deliveryItems: [0],
      id: 1,
      actuality: false,
      modal: false
    }
  },
  computed: {
    ...mapGetters([
      'DELIVERY_ITEMS',
      'FUELS',
      'PRICELIST'
    ])
  },
  created() {
    // заполняем store данными с сервера при рендеринге элемента
    this.fetchFuels()
    this.fetchPricelist()
  },
  methods: {
    ...mapActions([
      'ADD_DELIVERY_ITEM',
      'DELETE_DELIVERY_ITEM',
      'CHANGE_DELIVERY_ITEM',
      'CONFIRM_DELIVERY',
      'SAVE_FUELS_FROM_SERVER',
      'SAVE_PRICELIST_FROM_SERVER',
      'RESET_DELIVERY_ITEMS'
    ]),
    // получение всех видов топлива с сервера
    fetchFuels() {
      apiService.getFuels().then((response) => {
        this.SAVE_FUELS_FROM_SERVER(response.data)
      })
    },
    // получение цен на топливо из прайса
    fetchPricelist() {
      apiService.getPricelist().then((response) => {
        this.SAVE_PRICELIST_FROM_SERVER(response.data)
      })
    },
    // изменение Id элемента поставки при добавлении (используется в store при удалении и изменении до отправки)
    nextItemId() {
      this.deliveryItems.push(this.id++)
    },
    addDeliveryItem(data) {
      this.ADD_DELIVERY_ITEM({
        ...data,
        CreateDate: new Date(),
        UpdateDate: new Date() })
      this.$message('Единица топлива успешно занесена в заявку!')
    },
    deleteFromDelivery(index) {
      this.DELETE_DELIVERY_ITEM(index)
      this.deliveryItems.splice(index, 1)
      this.$message({
        message: 'Единица топлива удалена из заявки!',
        type: 'warning'
      })
    },
    changeDeliveryItem(data) {
      this.CHANGE_DELIVERY_ITEM({
        ...data,
        UpdateDate: new Date()
      })
      this.$message('Единица топлива изменена!')
    },
    // регулирование появления модального окна для отображения содержимого поставки
    showSummaryDelivery() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    // отправка заявки на поставку
    async confirmDelivery(stationId) {
      await this.CONFIRM_DELIVERY({
        StationId: stationId,
        CreateDate: new Date(),
        UpdateDate: new Date()
      })
      this.modal = false
      this.$message('Заявка отправлена!')
      this.$router.push({ path: this.redirect || '/delivery/delivery-history' })
    },
    resetDeliveriesItems() {
      this.RESET_DELIVERY_ITEMS()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.create_delivery_btns {
  text-align: center;
  width: 300px;
  margin: 0 auto;
}
.create_delivery_btn {
  text-align: center;
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
}
</style>
