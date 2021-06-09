<template>
  <div class="fuel">
    <hr class="fuel-divider">
    <div class="fuel-wrapper">
      <img src="../../assets/images/memes/kawai.png" class="fuel-img"/>
      <ul class="fuel-block">
        <li
          v-for="item in fuelOfColumn"
          :key="item.fuelId"
          class="fuel-block-btn"
          :label="item.fuelName"
          :value="item.fuelId"
          @click="chooseFuel(item.fuelId)"
        >
        <span class="fuel-block-btn-name">
          {{ item.fuelName }}
        </span>
          <span class="fuel-block-btn-price">
          {{ item.price }}
        </span>
        </li>
      </ul>
      <img src="../../assets/images/memes/pepa.png" class="fuel-img"/>
    </div>
    <hr class="fuel-block-divider">
  </div>
</template>

<script>
export default {
  name: 'FuelSelection',
  props: {
    fuelOfColumn: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    chooseFuel(item_id) {
      const columnsBtns = document.querySelectorAll('.fuel-block-btn')
      columnsBtns.forEach((item, index) => {
        if (item.value === item_id) {
          item.classList.add('fuel-block-btn_active')
        } else {
          item.classList.remove('fuel-block-btn_active')
        }
      })
      // передаем id выбранного топлива родительскому элементу
      this.$emit('chooseFuel', item_id)
    }
  }
}
</script>

<style scoped lang="scss">
.fuel {
  display: block;
  margin: 0 auto;
  width: 80%;
  &-wrapper {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
  &-img {
    height: 270px;
  }
  &-block {
    list-style-type: none;
    display: grid;
    margin-top: 50px;
    display: grid;
    padding: 0 40px;
    //grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-columns: 400px;
    grid-auto-rows: minmax(45px, auto);
    &-btn {
      display: flex;
      //justify-content: space-around;
      align-items: center;
      //padding: 0 20px;
      background: radial-gradient(#f2fcff, #c7f2ff);
      box-shadow: 5px 5px 10px rgba(0,0,0,0.3), -5px -10px 20px rgba(255,255,255,0.5);
      border: #888888 solid 1px;
      width: 100%;
      height: 40px;
      border-radius: 10px;
    &-name, &-price {
      text-align: center;
      font-size: 18px;
      width: 50%;
      font-family: 'Roboto', sans-serif;
    }
    &_active {
       transform: scale(1.1);
       border: #1482f0 solid 4px;
     }
    &:hover {
       transform: scale(1.1);
       transition: all 0.7s;
     }
    &:target {
       background-color: #64b5f6;
     }
    }
    &-divider {
      margin: 70px auto;
    }
  }
}
</style>
