<template>
  <div class="login-container">
    <Login
      v-if="!reg"
      @showRegistration="showRegistration"
      @handleLogin="handleLogin"
      :loading="this.loading"
    />
    <Registration v-if="reg" @backToLogin="backToLogin" @handleRegistration="handleRegistration"/>
  </div>
</template>

<script>
import Registration from './registration'
import Login from './login'
import LoginService from '../../api/login'
const loginService = new LoginService()

export default {
  name: 'IndexLogin',
  components: {
    Registration,
    Login
  },
  data() {
    return {
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      reg: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // показываем окно для регистрации
    showRegistration() {
      this.reg = true
    },
    // обрабатываем регистрацию нового пользователя
    handleRegistration(payload) {
      loginService.register(payload, 'client').then((response) => {
        if (response.data.succeeded === true) {
          this.$message('Регистрация прошла успешно!')
          const { username, password } = payload
          this.handleLogin({ username, password })
        } else {
          response.data.forEach((item) => {
            if (item.code === 'DuplicateUserName') {
              this.$message('Такое имя пользователя уже существует!')
            } else {
              this.$message(item)
            }
          })
        }
      })
        .catch(() => {
          this.$message('Попытка регистрации нового пользователя завершилась неудачно, пожалуйста, попробуйте зарегистрироваться снова!')
        })
    },
    handleLogin(payload) {
      const { username, password } = payload
      this.loading = true
      return new Promise((resolve, reject) => {
        loginService.getTokenAsync({ username: username.trim(), password: password }).then(response => {
          if (response.access_token) {
            this.$store.dispatch('user/login', response)
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          } else {
            this.loading = false
            if (response === 'Invalid username or password.') {
              this.$message('Неверный логин или пароль.')
            } else {
              this.$message(response)
            }
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
        this.$store.dispatch('user/login', payload).then(() => {
          this.$router.push({ path: this.redirect || '/' })
          console.log('in handle login')
          // this.loading = false
        }).catch(() => {
          this.$message('А кто это тут у нас?')
          this.loading = false
        })
      })
    },
    // возвращаемся на страницу входа
    backToLogin() {
      this.reg = false
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
.el-table .cell {
  word-break: break-word;
}
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
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
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
