<template>
  <div class="modal">
    <div class="modal_dialog">
      <div class="modal_close" @click="closeModal">
        &times;
      </div>
      <h3 class="modal_title">
        Добавление сотрудника
      </h3>
      <el-form ref="form" :model="form" class="login-form" auto-complete="on" label-position="left" label-width="120px">
        <el-form-item label="Фамилия">
          <el-input v-model="form.LastName" placeholder="Введите фамилию"></el-input>
        </el-form-item>
        <el-form-item label="Имя">
          <el-input v-model="form.FirstName" placeholder="Введите имя"></el-input>
        </el-form-item>
        <el-form-item label="Отчество">
          <el-input v-model="form.MiddleName" placeholder="Введите отчество"></el-input>
        </el-form-item>
        <el-form-item label="Станция">
          <el-select v-model="StationId" placeholder="Выберите станцию">
            <el-option
              v-for="item in STATIONS"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Таб. номер">
          <el-input v-model="form.Code" placeholder="Введите табельный номер"></el-input>
        </el-form-item>
        <el-form-item label="Должность">
          <el-select
            v-model="form.PositionId"
            placeholder="Выберите должность"
          >
            <el-option
              v-for="item in POSITIONS"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Дата рождения">
          <el-date-picker
            v-model="form.Birthdate"
            class="modal-item"
            type="date"
            placeholder="Выберите ДР"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-edit"
            type="warning"
            plain
            @click="saveEmployee"
          >
            Сохранить сотрудника
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ApiService from '../../api/services'
const apiService = new ApiService()
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CreateEmployee',
  data() {
    return {
      form: {
        LastName: '',
        FirstName: '',
        MiddleName: '',
        Code: '',
        Birthdate: '',
        PositionId: '',
        Status: true,
        Stations: []
      },
      StationId: ''
    }
  },
  computed: {
    ...mapGetters([
      'POSITIONS',
      'STATIONS'
    ]),
    Station: function() {
      return this.STATIONS.find((item) => item.id === this.StationId)
    }
  },
  created() {
    this.fetchPositions()
    this.fetchStations()
  },
  methods: {
    ...mapActions([
      'SAVE_POSITIONS_FROM_SERVER',
      'SAVE_STATIONS_FROM_SERVER'
    ]),
    fetchPositions() {
      apiService.getPositions().then(response => {
        console.log(response)
        this.SAVE_POSITIONS_FROM_SERVER(response.data)
      })
    },
    fetchStations() {
      apiService.getStations().then((response) => {
        this.SAVE_STATIONS_FROM_SERVER(response.data)
      })
    },
    closeModal() {
      this.$emit('closeModal')
    },
    saveEmployee() {
      this.form.Stations.push(this.Station)
      this.$emit('saveEmployee', { ...this.form, CreateDate: new Date(), UpdateDate: new Date() })
    }
  }
}
</script>

<style scoped>
  .modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: block;
    background-color: rgba(0,0,0,.3);
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
</style>
