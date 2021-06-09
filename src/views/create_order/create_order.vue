<template>
  <div
    class="app-container create_order"
  >
    <StationSelection
      :stations="STATIONS"
      @chooseStation="chooseStation"
    />
    <ColumnsSelection
      v-if="form.StationId"
      :fillingColumns="fillingColumns"
      :fuelToChoose="fuelsToOrder"
      @chooseColumn="chooseColumn"
    />
    <FuelSelection
      v-if="form.FillingColumnId"
      :fuelOfColumn="fuelsToOrder"
      @chooseFuel="chooseFuel"
    />
    <ValueSlider
      v-if="form.FuelId"
      @setValue="setValue"
    />
    <div class="create-order-sum" v-if="this.form.FuelId">
      {{ sum }} &#8381;
    </div>
    <el-button
      v-if="form.Value >= 1"
      class="create-order-btn"
      type="success"
      icon="el-icon-check"
      round
      @click="createOrder"
    >
      Оформить заказ
    </el-button>
  </div>
</template>

<script>
import StationSelection from './station_selection'
import ColumnsSelection from './columns_selection'
import FuelSelection from './fuel_selection'
import ValueSlider from './value_slider'
import { mapGetters, mapActions } from 'vuex'
import { byField } from '../../utils'
import ApiService from '../../api/services'
const apiService = new ApiService()
export default {
  name: 'CreateOrder',
  components: {
    StationSelection,
    ColumnsSelection,
    FuelSelection,
    ValueSlider
  },
  data() {
    return {
      form: {
        StationId: null,
        FillingColumnId: null,
        FuelId: '',
        Value: null
      },
      changeButton: { status: false, trigger: false },
      fuelsToOrder: []
    }
  },
  computed: {
    ...mapGetters([
      'FUELS',
      'FILLING_COLUMNS',
      'STATIONS'
    ]),
    sum: function() {
      return +this.price * +this.form.Value
    },
    // возвращает отсортированные по коду колонки, привязанные к выбранной станции
    fillingColumns: function() {
      if (this.form.StationId === null) {
        return []
      } else {
        return this.FILLING_COLUMNS.filter((item) => item.stationId === this.form.StationId)
          .sort(byField('code'))
      }
    },
    // ищем цену на топливо, которое выбрали
    price: function () {
      if (this.form.FuelId) {
        let fuel = this.fuelsToOrder.find(item => item.fuelId === this.form.FuelId)
        return fuel.price
      }
    }
  },
  created() {
    // заполняем store данными с сервера при рендеринге элемента
    this.fetchStations()
    this.fetchFillingColumns()
  },
  methods: {
    ...mapActions([
      'SAVE_STATIONS_FROM_SERVER',
      'SAVE_FILLING_COLUMNS_FROM_SERVER'
    ]),
    // получаем станции с сервера и пушим их в store
    fetchStations() {
      apiService.getStations().then((response) => {
        this.SAVE_STATIONS_FROM_SERVER(response.data)
      })
    },
    // получаем колонки с сервера и пушим их в store
    fetchFillingColumns() {
      apiService.getFillingColumns().then((response) => {
        this.SAVE_FILLING_COLUMNS_FROM_SERVER(response.data)
      })
    },
    // получаем типы топлива, доступные выбранной колонке
    fetchFuelsToOrder(fillingColumnId) {
      apiService.getFuelsToOrder(fillingColumnId).then((response) => {
        this.fuelsToOrder = response.data
      })
    },
    // добавление кнопки "Сохранить изменения" после изменения единицы поставки
    addChangeBtn() {
      if (this.changeButton.trigger) {
        this.changeButton.status = true
      }
    },
    chooseStation(station_id) {
      this.form.StationId = station_id
      this.form.FillingColumnId = null
    },
    chooseColumn(column_id) {
      this.form.FillingColumnId = column_id
      this.form.FuelId = null
      this.fetchFuelsToOrder(column_id)
    },
    chooseFuel(fuelId) {
      this.form.FuelId = fuelId
    },
    // установка необходимого объема топлива для заправки в заказе
    setValue(val) {
      this.form.Value = val
    },
    createOrder() {
      const { StationId, FuelId, Value } = this.form
      apiService.createOrder({ StationId: StationId, FuelId: FuelId, Value: Value, UserName: sessionStorage.getItem('username'), Price: this.price }).then((response) => {
        console.log(response)
        this.$router.push({ path: this.redirect || '/orders/order_history' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.create-order {
  &-btn {
    display: block;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  &-sum {
    font-size: 30px;
    text-align: center;
    margin: 50px auto;
  }
}
</style>
