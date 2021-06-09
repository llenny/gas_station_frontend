<template>
  <div>
    <h1 class="filling_columns_title">
      Управление колонками
    </h1>
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="Станция">
        <el-select v-model="form.StationId" placeholder="Выберите станцию">
          <el-option
            v-for="item in STATIONS"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.StationId" label="Колонка">
        <el-select
          v-model="form.FillingColumnId"
          placeholder="Выберите колонку"
          @change="loadCheckedColumns(form.FillingColumnId)"
        >
          <el-option
            v-for="item in fillingColumns"
            :key="item.id"
            :label="item.code"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.FillingColumnId">
        <h3>Выберите типы топлива, которые смогут быть использованы на колонке</h3>
        <template>
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            Выбрать все
          </el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="checked" @change="handleCheckedChange">
            <el-checkbox
              v-for="item in FUEL_TYPES"
              :key="item.id"
              :label="item"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-form-item>
      <el-form-item v-if="checked.length > 0">
        <el-button type="primary" @click="saveFillingColumn">
          Сохранить
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiService from '../../api/services'
const apiService = new ApiService()
import { byField} from "../../utils"

export default {
  name: 'FillingColumns',
  data() {
    return {
      form: {
        item_key: this.item_key,
        StationId: null,
        FillingColumnId: null
      },
      saving: false,
      checkAll: false,
      checked: [],
      isIndeterminate: true
    }
  },
  computed: {
    ...mapGetters([
      'FILLING_COLUMNS',
      'STATIONS',
      'FUEL_TYPES'
    ]),
    // возвращает колонки, привязанные к выбранной станции
    fillingColumns: function() {
      if (this.form.StationId === null) {
        return []
      } else {
        const filColumns = this.FILLING_COLUMNS.filter((item) => item.stationId === this.form.StationId)
        return filColumns.sort(byField('code'))
      }
    }
  },
  created() {
    // заполняем store данными с сервера при рендеринге элемента
    this.fetchStations()
    this.fetchFillingColumns()
    this.fetchFuelTypes()
  },
  methods: {
    ...mapActions([
      'SAVE_STATIONS_FROM_SERVER',
      'SAVE_FILLING_COLUMNS_FROM_SERVER',
      'SAVE_FUEL_TYPES_FROM_SERVER'
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
    // получаем типы топлива с сервера и пушим их в store
    fetchFuelTypes() {
      apiService.getFuelTypes().then((response) => {
        this.SAVE_FUEL_TYPES_FROM_SERVER(response.data)
      })
    },
    // выбор всех типов
    handleCheckAllChange(val) {
      this.checked = val ? this.FUEL_TYPES : []
      this.isIndeterminate = false
    },
    // изменение выбранных типов топлива
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.FUEL_TYPES.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.FUEL_TYPES.length
    },
    // автоматическая подгрузка типов топлива, привязанных к колонке
    loadCheckedColumns(index) {
      const fuelTypesOfColumn = this.fillingColumns.find((item) => item.id === index).fuelTypes
      const checkedFuelTypes = this.FUEL_TYPES.filter((item) => fuelTypesOfColumn.includes(item.Id))
      this.checked = checkedFuelTypes
      return checkedFuelTypes
    },
    saveFillingColumn() {
      const sendFuelTypes = []
      this.checked.forEach((item) => {
        sendFuelTypes.push(item.id)
      })
      const sendItem = { Id: this.form.FillingColumnId, FuelTypes: this.checked }
      apiService.postFillingColumnFuelType(sendItem)
      this.$message('Типы топлива для выбранной колонки сохранены!')
    }
  }
}
</script>

<style scoped lang="scss">
.filling_columns_title {
  text-align: center;
  display: block;
}
</style>
