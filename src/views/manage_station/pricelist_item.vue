<template>
  <div class="pricelist-item">
    <div class="modal_info">
      <div class="modal_dialog">
        <div class="modal_close" @click="closeModal">
          &times;
        </div>
        <h3 class="modal_title">
          Добавление новой записи в прайслист
        </h3>
        <el-select
          v-model="form.FuelId"
          class="modal-item fuel-select"
          placeholder="Выберите топливо"
        >
          <el-option
            v-for="item in FUELS"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            class="fuel-select"
          />
        </el-select>
        <el-input
          v-model="form.Price"
          placeholder="Введите цену"
          class="modal-item input-price"
        />
        <el-date-picker
          v-model="form.BeginDate"
          class="modal-item"
          type="date"
          placeholder="Дата начала действия"
          @input="validateEndDate"
          :picker-options="datePickerOptions"
        />
        <el-date-picker
          v-model="form.EndDate"
          type="date"
          class="modal-item"
          placeholder="Дата окончания действия"
          :picker-options="dueDatePickerOptions"
        />
        <el-button class="save-btn" @click="savePricelistItem">Сохранить</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ApiService from '../../api/services'
const apiService = new ApiService()

export default {
  name: 'PricelistItem',
  data() {
    return {
      form: {
        FuelId: '',
        BeginDate: null,
        EndDate: null,
        Price: null,
        Status: false,
        Note: ''
      },
      datePickerOptions: {
        disabledDate(date) {
          return date < new Date()
        }
      },
      dueDatePickerOptions: {
        disabledDate: this.disabledDueDate
      }
    }
  },
  computed: {
    ...mapGetters([
      'FUELS'
    ])
  },
  created() {
    // заполняем store данными с сервера при рендеринге элемента
    this.fetchFuels()
  },
  methods: {
    ...mapActions([
      'SAVE_FUELS_FROM_SERVER'
    ]),
    disabledDueDate(time) {
      return time.getTime() < this.form.BeginDate
    },
    validateEndDate() {
      if (this.form.BeginDate > this.form.EndDate) {
        this.form.EndDate = ''
      }
    },
    fetchFuels() {
      apiService.getFuels().then((response) => {
        this.SAVE_FUELS_FROM_SERVER(response.data)
      })
    },
    closeModal() {
      this.$emit('closeModal')
    },
    // постинг записи прайслиста на сервер
    savePricelistItem() {
      apiService.postPricelistItem({ FuelId: this.form.FuelId, BeginDate: this.form.BeginDate, EndDate: this.form.EndDate, Price: this.form.Price, Note: this.form.Note })
      this.closeModal()
    }
  }
}
</script>

<style scoped lang="scss">
.modal_info {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: block;
  background-color: rgba(0,0,0,.2);
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

.modal-item {
  display: block;
  margin: 10px auto;
}
.input-price {
  width: 217px;
}
.fuel-select {
  width: 217px;
}

.hide {
  display: none;
}

  .save-btn {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }

</style>
