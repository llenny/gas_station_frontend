<template>
  <div class="login_block">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left" :rules="loginRules">

      <div class="title-container">
        <h3 class="title">Войти</h3>
      </div>

      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Введите имя пользователя"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Введите пароль"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <div class="login_btns">
        <el-button
          :loading="loadingInner"
          style="width:100%;margin-bottom:30px;"
          class="login_btn"
          @click.native.prevent="showRegistration"
        >
          Зарегистрироваться
        </el-button>
        <el-button
          :loading="loading"
          style="width:100%;margin-bottom:30px;"
          class="login_btn"
          @click.native.prevent="handleLogin"
        >
          Войти
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'LoginPanel',
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
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loadingInner: this.loading,
      passwordType: 'password',
      redirect: undefined
    }
  },
  props: ['loading'],
  methods: {
    handleLogin() {
      // проверяем валидны ли имя пользователя и пароль
      // если да, отправляем запрос на сервер для получения токена
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loadingInner = true
          this.$emit('handleLogin', this.loginForm)
        } else {
          return false
        }
      })
    },
    showRegistration() {
      this.$emit('showRegistration')
    }
  }
}
</script>

<style lang="scss">

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  /* reset element-ui css */
  .login-container {
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

<style scoped lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login {
  &_btns {
    display: flex;
    justify-content: space-between;
  }
}
.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/images/bg/login_bg.jpg") center center/cover no-repeat;
  overflow: hidden;

.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
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
