<template>
  <div class="station-block">
    <img src="../../assets/images/memes/will.png" class="create_order_btn_img"/>
    <ul class="station-block-ul">
      <li
        v-for="item in stations"
        :key="item.id"
        class="station-block-btn"
        :value="item.id"
        @click="chooseStation(item.id)"
      >
        <img
          src="../../assets/gas-station.png"
          class="station-block-btn-icon"
        >
        <span class="station-block-btn-descr">
          {{ item.name }}
        </span>
        <span class="station-block-btn-address">
          {{ item.address }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StationSelection',
  props: {
    stations: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    chooseStation(item_id) {
      const stationsBtns = document.querySelectorAll('.station-block-btn')
      stationsBtns.forEach((item, index) => {
        if (index === item_id - 1) {
          item.classList.add('station-block-btn_active')
        } else {
          item.classList.remove('station-block-btn_active')
        }
      })
      const stationBlock = document.querySelector('.station-block')
      document.body.scrollTop = stationBlock.scrollHeight
      // stationBlock.scrollTop = stationBlock.scrollHeight
      // передаем id выбранной станции родительскому элементу
      this.$emit('chooseStation', item_id)
    }
  }
}
</script>

<style lang="scss" scoped>
.station {
  &-block {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    padding: 0;
    &-ul {
      margin-left: 70px;
      list-style-type: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 140px;
      grid-gap: 30px;
      padding: 0;
    }
    &-btn {
      background: linear-gradient(45deg, #dddddd, #bbe9ff);
      box-shadow: 5px 5px 10px rgba(0,0,0,0.3), -5px -10px 20px rgba(255,255,255,0.5);
      border: #222222;
      margin: 0 auto;
      width: 190px;
      height: 140px;
      border-radius: 10px;
      &-icon {
        position: absolute;
        margin-top: 5px;
        margin-left: 0px;
        width: 70px;
        height: 70px;
        opacity: 0.9;
      }
      &-descr, &-address {
        text-align: center;
        font-size: 17px;
        font-family: 'Roboto', sans-serif;
        position: relative;
        display: block;
        margin-top: 15px;
        margin-left: 50px;
      }
      &-address {
        font-size: 14px;
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
  }
}
</style>
