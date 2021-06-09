<template>
  <div class="pricelist">
    <h1 class="pricelist-title">
      Прайслист
    </h1>
    <el-table
      v-loading="listLoading"
      :data="PRICELIST"
      class="pricelist-table"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column prop="id" label="Id" />
      <el-table-column prop="fuelName" label="Название" />
      <el-table-column prop="price" label="Цена" />
      <el-table-column prop="beginDate" label="Дата начала">
        <template scope="scope">
          {{ formatDateComp(scope.row.beginDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="Дата окончания">
        <template scope="scope">
          {{ formatDateComp(scope.row.endDate) }}
        </template>
      </el-table-column>
    </el-table>
    <el-button class="create-btn" @click="showCreatePanel">
      Добавить новую запись в прайс
    </el-button>
    <PricelistItem
      v-if="modal"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>

import PricelistItem from './pricelist_item'

import ApiService from '../../api/services'
import { formatDate } from '../../utils/index'
const apiService = new ApiService()

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Pricelist',
  components: {
    PricelistItem
  },
  data() {
    return {
      listLoading: false,
      modal: false,
      activate: 'Деактивировать'
    }
  },
  computed: {
    ...mapGetters([
      'PRICELIST'
    ]),
    filteredItems: function(searchPhrase) {
      return this.PRICELIST.filter((item) => item.fuelName === searchPhrase)
    }
  },
  created() {
    // заполняем store данными с сервера при рендеринге элемента
    this.fetchPricelist()
  },
  methods: {
    ...mapActions([
      'SAVE_PRICELIST_FROM_SERVER'
    ]),
    searchSmth(searchPhrase) {
      this.filteredItems(searchPhrase)
    },
    showCreatePanel() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
      this.fetchPricelist()
    },
    fetchPricelist() {
      apiService.getPricelist().then((response) => {
        this.SAVE_PRICELIST_FROM_SERVER(response.data)
      })
    },
    formatDateComp: function(item) {
      if (item) {
        return formatDate(item)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pricelist {
  display: block;
  margin: 40px auto 0;
  width: 90%;
  &-title {
    text-align: center;
  }
  &-table {
    margin-top: 50px;
  }
}
  .create-btn {
    display: block;
    margin: 50px auto;
  }
</style>
