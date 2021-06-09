<template>
    <div>
      <h1 class="title">Сотрудники</h1>
      <el-table
        v-loading="listLoading"
        :data="list"
        class="employees-table"
        element-loading-text="Loading"
        border
        highlight-current-row
      >
        <el-table-column prop="id" label="Id" width="50px"/>
        <el-table-column prop="name" label="ФИО" width="270px"/>
        <el-table-column prop="positionName" label="Должность" width="130px"/>
        <el-table-column prop="status" label="Статус" width="85px">
          <template scope="scope">
            <span v-if="scope.row.status">Работает</span>
            <span v-else>Уволен</span>
          </template>
        </el-table-column>
        <el-table-column prop="stationName" label="Станция" width="170px" />
        <el-table-column prop="birthdate" label="День рождения" width="105px">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatDateComp(scope.row.birthdate) }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-button
              v-if="!scope.row.userId"
              type="primary"
              size="mini"
              @click="showUserBind(scope.row.id)"
            >
              Создать пользователя
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <UserBind
        v-if="createModal"
        @closeModal="closeModal"
        :employeeId="newEmployeeUser"
        @saveEmployeeUser="saveEmployeeUser"
      />
      <el-button class="create_employee_btn" @click="showCreateEmployee">Добавить сотрудника</el-button>
      <CreateEmployee v-if="createEmpModal" @closeModal="closeModal" @saveEmployee="saveEmployee"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate } from '../../utils/index'
import ApiService from '../../api/services'
const apiService = new ApiService()
import LoginService from '../../api/login'
const loginService = new LoginService()
import UserBind from './user_bind'
import CreateEmployee from './create_employee'

export default {
  name: 'EmployeesList',
  components: {
    UserBind,
    CreateEmployee
  },
  data() {
    return {
      list: null,
      listLoading: false,
      createModal: false,
      createEmpModal: false,
      newEmployeeUser: ''
    }
  },
  computed: {
    ...mapGetters([
      'EMPLOYEES'
    ])
  },
  created() {
    // получаем всех сотрудников с сервера при рендеринге
    this.fetchEmployees()
  },
  methods: {
    // получаем сотрудников с сервера
    fetchEmployees() {
      this.listLoading = true
      apiService.getEmployees().then(response => {
        this.list = response.data
        console.log(response)
        this.listLoading = false
      })
    },
    formatDateComp(item) {
      if (item) {
        return formatDate(item)
      }
    },
    showUserBind(id) {
      this.createModal = true
      this.newEmployeeUser = id
    },
    showCreateEmployee() {
      this.createEmpModal = true
    },
    // привязываем создаваемого пользователя к сотруднику
    saveEmployeeUser(payload) {
      const { username, email, password, employeeId, role } = payload
      const sendItem = { username: username, email: email, password: password, employeeId: employeeId}
      loginService.register(sendItem, role)
        .then(() => {
          this.$message('Пользователь для сотрудника создан!')
          this.list.push(payload)
        })
        .catch((error) => {
          console.log(error)
          this.$message('Что-то пошло не так')
        })
    },
    closeModal() {
      this.createModal = false
      this.createEmpModal = false
    },
    saveEmployee(payload) {
      apiService.createEmployee(payload)
        .then((response) => {
          console.log(response)
          this.createEmpModal = false
          this.$message('Сотрудник создан')
        })
        .catch((error) => {
          console.log(error)
          this.$message('Что-то пошло не так')
        })
    }
  }
}
</script>

<style scoped lang="scss">

.employees {
  &-table {
    display: block;
    margin: 50px auto 0;
    max-width: 1030px;
    width: 95%;
  }
}
.title {
  margin-top: 50px;
  text-align: center;
}
.create_employee_btn {
  display: block;
  margin: 30px auto;
}
</style>
