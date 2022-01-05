<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShowShopCartList">
          <div class="logo-wrapper">
            <div class="logo highlight">
              <i class="iconfont icon-shopping_cart highlight"></i>
            </div>
            <div class="num">{{ totalNum }}</div>
          </div>
          <div class="price highlight">￥{{ totalPrice }}</div>
          <div class="desc">另需配送费￥4 元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payEnoughClass">{{ restPrice }}</div>
        </div>
      </div>
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="emptyCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food, index) in cartFoods" :key="index">
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>￥{{ food.price }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"></CartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="list-mask"
      v-show="listShow"
      @click="toggleShowShopCartList()"
    ></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import BetterScroll from 'better-scroll';
import CartControl from '@/components/CartControl/CartControl';

export default {
  data() {
    return {
      isShowShopCartList: false,
      listScroll: ''
    };
  },
  mounted() {
    if (this.cartFoods.length === 0) {
      this.isShowShopCartList = false;
      // return false;
    }
  },
  methods: {
    // 切换战士购物车
    toggleShowShopCartList() {
      this.isShowShopCartList = !this.isShowShopCartList;
    },
    // 清空购物车
    emptyCart() {
      if (confirm('是否清空?')) {
        this.$store.commit('EMPTYCART');
      }
    }
  },

  components: {
    CartControl
  },
  computed: {
    ...mapState(['shopInfo', 'cartFoods']),
    ...mapGetters(['totalPrice', 'totalNum']),
    // 剩余支付钱提示文字
    restPrice() {
      let { totalPrice, shopInfo } = this;
      if (totalPrice === 0) {
        return `还差${shopInfo.minPrice}起送`;
      } else if (shopInfo.minPrice > totalPrice) {
        return `还差${shopInfo.minPrice - totalPrice}起送`;
      } else {
        return `结算`;
      }
    },
    // 剩余支付类名
    payEnoughClass() {
      let { totalPrice, shopInfo } = this;
      return shopInfo.minPrice > totalPrice ? 'not-enough' : 'enough';
    },
    //
    listShow() {
      if (this.cartFoods.length === 0) {
        this.isShowShopCartList = false;
        return false;
      }
      if (this.isShowShopCartList) {
        if (!this.listScroll) {
          this.$nextTick(() => {
            this.listScroll = new BetterScroll('.list-content', {
              scrollY: true, //开启纵向滚动
              probeType: 2, //开启事件监听模式,
              click: true
            });
          });
        } else {
          console.log('ds');
          this.listScroll.refresh();
        }
      }
      return this.isShowShopCartList;
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

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $green;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>
