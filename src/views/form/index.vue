<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="200px" class="form">
      <el-form-item label="Тема обращения">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Оставьте обращение">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Отправить</el-button>
      </el-form-item>
    </el-form>
    <img src="../../assets/images/memes/man.png" class="form_img"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped lang="scss">

.form {
  margin: 50px;
  width: 70%;
}

.form_img {
  width: 300px;
  position: absolute;
  bottom: -120px;
  animation: change_place_back 0.7s forwards;
}
.form_img:hover {
  animation: change_place 0.7s forwards;
}
@keyframes change_place {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-120px);
  }
}
@keyframes change_width_back {
  from {
    transform: translateY(-120px);
  }
  to {
    transform: translateY(0);
  }
}
</style>

