<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{ alertText }}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    alertText: String
  },

  methods: {
    closeTip() {
      // 分发自定义事件(事件名: closeTip)
      this.$emit('closeTip');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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

@keyframes tipMove {
  0% {
    transform: scale(1);
  }

  35% {
    transform: scale(0.8);
  }

  70% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.alert_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.5);

  .tip_text_container {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -90px;
    margin-left: -110px;
    width: 60%;
    animation: tipMove 0.4s;
    background-color: rgba(255, 255, 255, 1);
    border: 1px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;

    .tip_icon {
      width: 55px;
      height: 55px;
      border: 2px solid #f8cb86;
      border-radius: 50%;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      span:nth-of-type(1) {
        width: 2px;
        height: 30px;
        background-color: #f8cb86;
      }

      span:nth-of-type(2) {
        width: 2px;
        height: 2px;
        border: 1px;
        border-radius: 50%;
        margin-top: 2px;
        background-color: #f8cb86;
      }
    }

    .tip_text {
      font-size: 14px;
      color: #333;
      line-height: 20px;
      text-align: center;
      margin-top: 10px;
      padding: 0 5px;
    }

    .confrim {
      font-size: 18px;
      font-weight: bold;
      margin-top: 10px;
      background-color: #4cd964;
      width: 100%;
      text-align: center;
      line-height: 35px;
      border: 1px;
      color: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
