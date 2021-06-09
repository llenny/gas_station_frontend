<template>
  <div class="slider-block">
    <div class="slider-value">
      {{ slider_val }}
    </div>
    <div class="slidecontainer">
      <input
        id="value_slider"
        type="range"
        min="1"
        max="100"
        value="0"
        class="slider"
        @mousemove="setValue"
      >
    </div>
  </div>
</template>

<script>

export default {
  name: 'ValueSlider',
  data() {
    return {
      slider_val: 0
    }
  },
  methods: {
    setValue() {
      const slider = document.getElementById('value_slider')
      this.slider_val = slider.value
      const sliderValue = document.querySelector('.slider-value')
      sliderValue.innerHTML = slider.value
      this.$emit('setValue', this.slider_val)
    }
  }
}
</script>

<style scoped lang="scss">
.slidecontainer {
  margin-top: 70px;
  width: 200px;
}

.slider {
  -webkit-appearance: none;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  width: 200px;
  &-block {
    display: block;
    width: 200px;
    margin: 0 auto;
    text-align: center;
  }
  &-value {
    margin-top: 70px;
    font-size: 30px;
    text-align: center;
  }
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  /*appearance: none;*/
  margin-top: -10px;
  width: 60px;
  height: 42px;
  border: 0;
  background: url('../../assets/slider/60x42_cat.gif');
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 23px;
  height: 25px;
  border: 0;
  background: url('../../assets/slider/60x42_cat.gif');
  cursor: pointer;
}

.slider-fill {
  z-index: 2;
  width: 100%;
  height: 100%;
  background: url('../../assets/slider/rainbow.png');
}
</style>
