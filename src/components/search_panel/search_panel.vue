<template>
  <div class="search-panel">
    <el-input
      v-model="input"
      placeholder="Введите фразу для поиска"
      @change="searchSmth"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchPanel',
  data() {
    return {
      input: null
    }
  },
  methods: {
    searchSmth() {
      this.$emit('searchSmth', this.input)
    }
  }
}
</script>

<style scoped>
.search-panel {
  margin: 0 auto;
  width: 70%;
}
</style>
