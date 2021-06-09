<template>
  <div class="reg-container">
    <el-form ref="regForm" :model="regForm" :rules="regRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Регистрация</h3>
      </div>

      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="regForm.email"
          placeholder="Введите e-mail"
          name="email"
          type="email"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="regForm.username"
          placeholder="Введите имя пользователя"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="regForm.password"
          :type="passwordType"
          placeholder="Введите пароль"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleRegistration"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <div class="reg_btns">
        <el-button :loading="loading" style="width:100%;margin-bottom:30px;" @click.native.prevent="backToLogin">Вернуться на страницу входа</el-button>
        <el-button :loading="loading" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegistration">Зарегистрироваться</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Registration',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Пожалуйста, введите имя пользователя корректно. Имя пользователя может содержать цифры и буквы латинского алфавита'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('В пароле должно содержаться не менее 6 символов'))
      } else {
        callback()
      }
    }
    return {
      regForm: {
        username: '',
        password: '',
        email: ''
      },
      regRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  methods: {
    // показать введенный пароль
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // обработка регистрации
    handleRegistration() {
      this.$emit('handleRegistration', this.regForm)
    },
    // вернуться на страницу входа
    backToLogin() {
      this.$emit('backToLogin')
    }
  }
}
</script>

<style scoped lang="scss">
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  .reg {
    &_btns {
      display: flex;
      justify-content: space-between;
    }
  }

  .reg-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
    caret-color: $cursor;

  &:-webkit-autofill {
     box-shadow: 0 0 0px 1000px $bg inset !important;
     -webkit-text-fill-color: $cursor !important;
   }
  }
  }
  .el-button {
    background: rgba(0, 0, 0, 0.4);
    color: #ffffff;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .reg_block {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    background: url("../../assets/images/bg/login_bg.jpg") center center/cover no-repeat;
    //background-color: $bg;
    overflow: hidden;

    .login-form {
      background: rgba(0, 0, 0, 0.2);
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 80px 35px 0;
      margin: 50px auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
