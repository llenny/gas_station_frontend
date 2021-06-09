<template>
  <div class="end_modal">
    <div class="modal_dialog">
      <div class="modal_close" @click="closeModal">
        &times;
      </div>
      <h3 class="modal_title">
        Подтверждение заявки
      </h3>
      <el-table
        :data="DELIVERY_ITEMS"
        element-loading-text="Loading"
        border
        highlight-current-row
      >
        <el-table-column prop="FuelName" label="Топливо" />
        <el-table-column prop="Price" label="Цена" />
        <el-table-column prop="Value" label="Объем" />
        <el-table-column prop="Sum" label="Стоимость" />
      </el-table>
      <div class="delivery-sum">Итоговая сумма заявки:  {{ sum }}</div>
      <el-select v-model="StationId" placeholder="Выберите станцию">
        <el-option
          v-for="item in STATIONS"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button
        class="modal_btn"
        type="primary"
        plain
        @click="confirmDelivery"
      >
        Отправить заявку в главный офис
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiService from '../../api/services'
const apiService = new ApiService()
export default {
  name: 'CreateDeliveryEnd',
  data() {
    return {
      StationId: null
    }
  },
  computed: {
    ...mapGetters([
      'DELIVERY_ITEMS',
      'STATIONS'
    ]),
    sum: function() {
      const SumOfDelivery = this.DELIVERY_ITEMS.reduce((sum, { Sum }) => sum + Sum, 0)
      return SumOfDelivery
    }
  },
  created() {
    // заполняем store данными с сервера при рендеринге элемента
    this.fetchStations()
  },
  methods: {
    ...mapActions([
      'SAVE_STATIONS_FROM_SERVER'
    ]),
    // получаем станции с сервера и пушим их в store
    fetchStations() {
      apiService.getStations().then((response) => {
        this.SAVE_STATIONS_FROM_SERVER(response.data)
      })
    },
    confirmDelivery() {
      this.$emit('confirmDelivery', this.StationId)
    },
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped lang="scss">
.end_modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: block;
  background-color: rgba(0,0,0,.5);
}

.modal_dialog {
  max-width: 500px;
  min-height: 350px;
  margin: 100px auto;
  background-color: white;
  padding: 0 20px 20px;
}

.modal_title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
}

.modal_close {
  position: relative;
  font-size: 30px;
  top: 10px;
  margin-left: 442px;
  color: #000;
  opacity: .5;
  font-weight: 700;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.modal_btn {
  display: block;
  margin: 0 auto;
  margin-top: 30px;
}

.add_panel_input {
  margin: 30px auto;
  text-align: center;
}

.delivery-sum {
  margin-top: 20px;
  text-align: right;
  color: #606266;
  font-family: 'Roboto', sans-serif;
}

.hide {
  display: none;
}
</style>
