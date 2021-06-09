<template>
  <div class="columns">
    <hr class="columns-block-divider">
    <div class="columns_wrapper">
      <ul class="columns-block">
        <li
          v-for="item in fillingColumns"
          :key="item.id"
          class="columns-block-btn"
          :label="item.code"
          :value="item.id"
          @click="chooseColumn(item.id, item.code)"
        >
        <span class="columns-block-btn-code">
          {{ item.code }}
        </span>
        </li>
      </ul>
      <img src="../../assets/images/memes/will2.png"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColumnsSelection',
  props: {
    fillingColumns: {
      type: Array,
      default() {
        return []
      }
    },
    fuelToChoose: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    fuels: function() {
      return this.fillingColumns.fuelTypes
    }
  },
  methods: {
    chooseColumn(item_id, item_code) {
      const columnsBtns = document.querySelectorAll('.columns-block-btn')
      columnsBtns.forEach((item, index) => {
        if (index === item_code - 1) {
          item.classList.add('columns-block-btn_active')
        } else {
          item.classList.remove('columns-block-btn_active')
        }
      })
      // передаем id выбранной колонки родительскому элементу
      this.$emit('chooseColumn', item_id)
    }
  }
}
</script>

<style scoped lang="scss">
.columns {
  &_wrapper {
    display: flex;
    justify-content: center;
  }
  &-block {
    list-style-type: none;
    display: grid;
    padding: 0;
    margin-top: 150px;
    margin-right: 50px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 140px;
    grid-gap: 50px;
    &-btn {
      background: linear-gradient(45deg, #dddddd, #bbe9ff);
      box-shadow: 5px 5px 10px rgba(0,0,0,0.3), -5px -10px 20px rgba(255,255,255,0.5);
      border: #222222;
      margin: 0 auto;
      width: 100px;
      height: 150px;
      border-radius: 10px;
      &-code {
        display: block;
        margin-left: 10px;
        //margin-top: 25px;
        text-align: left;
        font-size: 50px;
        font-family: 'Roboto', sans-serif;
      }
      &_active {
        background-color: #64b5f6;
        transform: scale(1.1);
        border: #1482f0 solid 4px;
      }
      &:hover {
        background-color: #64b5f6;
        transform: scale(1.1);
        transition: all 0.7s;
      }
      &:target {
        background-color: #64b5f6;
      }
    }
    &-divider {
      margin: 70px auto;
      width: 80%;
    }
  }
}
</style>
