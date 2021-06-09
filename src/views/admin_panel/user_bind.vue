<template>
  <div class="modal">
    <div class="modal_dialog">
      <div class="modal_close" @click="closeModal">
        &times;
      </div>
      <h3 class="modal_title">
        Добавление пользователя для сотрудника
      </h3>
      <el-form ref="form" :model="form" class="login-form" auto-complete="on" label-position="left" :rules="loginRules">
        <el-form-item>
          <el-input v-model="form.username" placeholder="Введите имя пользователя"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.email" placeholder="Введите почту пользователя"></el-input>
        </el-form-item>
        <el-form-item label="Роль пользователя">
          <el-select v-model="form.role" placeholder="Выберите роль пользователя">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="form.password"
            :type="passwordType"
            placeholder="Введите пароль"
            name="password"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-edit"
            type="warning"
            plain
            @click="saveEmployeeUser"
          >
            Сохранить пользователя
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user_bind',
  props: ['employeeId'],
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('В пароле должно содержаться не менее 6 символов'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        email: '',
        password: '',
        employeeId: this.employeeId,
        role: ''
      },
      roles: [
        { value: 'admin', label: 'Администратор' },
        { value: 'employee', label: 'Сотрудник' }
      ],
      loginRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    saveEmployeeUser() {
      this.$emit('saveEmployeeUser', this.form)
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
