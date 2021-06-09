<template>
  <div class="station-select">
    <h2 class="stations-title">Склад</h2>
    <div class="storage_btns">
      <el-select
        v-model="StationId"
        placeholder="Выберите станцию"
        class="stations"
        @change="fetchStorage"
      >
        <el-option
          v-for="item in STATIONS"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button @click="goToCreateDelivery">Сделать заявку</el-button>
    </div>
    <el-table
      v-if="StationId"
      v-loading="listLoading"
      :data="list"
      class="storage_table"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column prop="id" label="Id" width="40px" />
      <el-table-column prop="fuelName" label="Топливо" width="170px" />
      <el-table-column prop="value" label="Оставшийся объем (в литрах)" width="150px" />
      <el-table-column prop="stationName" label="Станция" width="250px" />
      <el-table-column prop="status" label="Статус" width="120px">
        <template scope="scope">
          <span v-if="scope.row.status">активно</span>
          <span v-else>заблокировано</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { byField } from '../../utils'
import ApiService from '../../api/services'
const apiService = new ApiService()
export default {
  name: 'Storage',
  data() {
    return {
      StationId: null,
      list: [],
      listLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'STATIONS'
    ])
  },
  created() {
    // заполняем store данными с сервера при рендеринге элемента
    this.fetchStations()
  },
  methods: {
    ...mapActions([
      'SAVE_STATIONS_FROM_SERVER'
    ]),
    // получаем данные по складу с сервера
    fetchStorage() {
      apiService.getStorage(this.StationId).then((response) => {
        // заполняем список единиц по складу
        this.list = response.data.sort(byField('id'))
      })
    },
    // получаем станции с сервера и пушим их в store
    fetchStations() {
      apiService.getStations().then((response) => {
        this.SAVE_STATIONS_FROM_SERVER(response.data)
      })
    },
    goToCreateDelivery() {
      this.$router.push({ path: this.redirect || '/delivery/create_delivery' })
    }
  }
}
</script>

<style scoped lang="scss">
.station-select {
  display: block;
  width: 731px;
  margin: 40px auto;
}

.storage {
  &_btns {
    display: flex;
  }
  &_table {
    margin-top: 50px;
  }
}
.stations {
  display: block;
  width: 300px;
  margin: 0 auto;
  &-title {
    text-align: center;
  }
}
</style>
