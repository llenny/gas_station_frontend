<template>
  <div class="modal_info">
    <div class="modal_dialog">
      <div class="modal_close" @click="closeModal">
        &times;
      </div>
      <h3 class="modal_title">
        Информация о заявке
      </h3>
      <el-table
        v-if="deliveryItemsApi.length > 0"
        :data="deliveryItemsApi"
        element-loading-text="Loading"
        border
        highlight-current-row
      >
        <el-table-column prop="fuelName" label="Топливо" />
        <el-table-column prop="price" label="Цена" />
        <el-table-column prop="value" label="Объем" />
        <el-table-column prop="sum" label="Стоимость" />
      </el-table>
      <div class="delivery-sum">Итоговая сумма заявки:  {{ sum }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeliveryInfo',
  props: {
    deliveryItemsApi: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      id: 1,
      actuality: false,
      modal: false
    }
  },
  computed: {
    sum: function() {
      const SumOfDelivery = this.deliveryItemsApi.reduce((Sum, { sum }) => Sum + sum, 0)
      return SumOfDelivery
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
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
