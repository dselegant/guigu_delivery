<template>
  <div id="app">
    <!-- <div class="content"> -->
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    <!-- </div> -->
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide';
import { mapActions } from 'vuex';
export default {
  components: {
    FooterGuide
  },
  mounted() {
    this.get_user();
  },
  methods: {
    ...mapActions(['get_user'])
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

$green = #02a774;
$yellow = #F5A100;
$bc = #e4e4e4;

bottom-border-1px($color) {
  position: relative;
  border: none;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: $color;
    transform: scaleY(0.5);
  }
}

top-border-1px($color) {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: $color;
  }
}

// 根据像素比缩放1px像素边框
@media only screen and (-webkit-device-pixel-ratio: 2) {
  .border-1px {
    &::before {
      transform: scaleY(0.5);
    }
  }
}

@media only screen and (-webkit-device-pixel-ratio: 3) {
  .border-1px {
    &::before {
      transform: scaleY(0.333333);
    }
  }
}

bg-image($url) {
  background-image: url($url + '@2x.png');

  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url($url + '@3x.png');
  }
}

// 清除浮动
clearFix() {
  *zoom: 1;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
</style>


