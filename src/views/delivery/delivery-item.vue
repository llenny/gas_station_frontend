<template>
  <div class="app-container delivery-item">
    <el-form ref="form" :rules="rules" :model="form" label-width="200px">
      <div>
        <el-form-item label="Шо за топливо">
          <el-select
            v-model="form.FuelId"
            placeholder="Выберите топливо"
            @change="addChangeBtn"
          >
            <el-option
              v-for="item in FUELS"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="Цена">
        <div>{{ price }}</div>
      </el-form-item>
      <el-form-item label="Необходимый объем">
        <el-slider
          v-model="form.Value"
          @change="addChangeBtn"
        />
      </el-form-item>
      <el-form-item label="Стоимость">
        <div>{{ sum }}</div>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-check"
          type="success"
          plain
          @click="addDeliveryItem('form')"
        >
          Занести в заявку
        </el-button>
        <el-button
          icon="el-icon-delete"
          type="danger"
          plain
          @click="deleteFromDelivery"
        >
          Удалить
        </el-button>
        <el-button
          v-if="changeButton.status"
          icon="el-icon-edit"
          type="warning"
          plain
          @click="changeDeliveryItem('form')"
        >
          Сохранить изменения
        </el-button>
      </el-form-item>
    </el-form>
    <hr>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DeliveryItem',
  props: ['itemId'],
  data() {
    return {
      form: {
        itemId: this.itemId,
        FuelId: '',
        Value: null
      },
      rules: {
        name: [
          { required: true, message: 'Пожалуйста, введите название топлива', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: 'Пожалуйста, выберите дату', trigger: 'change' }
        ]
      },
      changeButton: { status: false, trigger: false }
    }
  },
  computed: {
    ...mapGetters([
      'FUEL_TYPES',
      'FUELS',
      'PRICELIST'
    ]),
    sum: function() {
      return +this.price * +this.form.Value
    },
    deliveryItems() {
      return this.$store.getters.DELIVERY_ITEMS
    },
    price: function() {
      let fuelPrice = null
      // ищем цену по прайсу
      this.PRICELIST.find((item) => {
        if (item.fuelId === this.form.FuelId) {
          fuelPrice = item.price
          return fuelPrice
        }
      })
      return fuelPrice
    },
    fuelName: function () {
      if (this.form.FuelId) {
        const fuel = this.FUELS.find((item) => item.id === this.form.FuelId)
        return fuel.name
      }
    }
  },
  methods: {
    submitForm(formName) {
      let check = null
      this.$refs[formName].validate((valid) => {
        if (valid) {
          check = true
          return true
        } else {
          check = false
          console.log('error submit!!')
          return false
        }
      })
      return check
    },
    addChangeBtn() {
      if (this.changeButton.trigger) {
        this.changeButton.status = true
      }
    },
    deleteFromDelivery() {
      this.$emit('deleteFromDelivery')
    },
    addDeliveryItem(formName) {
      const checking = this.submitForm(formName)
      if (checking) {
        const deliveryItem = { Price: this.price, Sum: this.sum, ...this.form, FuelName: this.fuelName }
        this.changeButton.trigger = true
        this.$emit('addDeliveryItem', deliveryItem)
      }
    },
    changeDeliveryItem(formName) {
      const checking = this.submitForm(formName)
      if (checking) {
        const deliveryItem = { ...this.form }
        this.changeButton.status = false
        this.$emit('changeDeliveryItem', deliveryItem)
      }
    }
  }
}
</script>

<style scoped>

</style>
