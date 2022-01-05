<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--  -->
          <li
            class="menu-item"
            :class="{
              current: index === currentIndex
            }"
            v-for="(good, index) in goods"
            :key="index"
            @click="toScroll(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodList">
          <li
            class="food-list food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFoodCard(food)"
              >
                <div class="icon">
                  <img width="57" height="57" v-lazy="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售 {{ food.sellCount }} 份</span>
                    <span>好评率 {{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <FoodCard ref="FoodCard" :food="food"></FoodCard>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BetterScroll from 'better-scroll';
import CartControl from '@/components/CartControl/CartControl';
import FoodCard from '@/components/FoodCard/FoodCard';
import ShopCart from '@/components/ShopCart/ShopCart';
export default {
  data() {
    return {
      scrollY: 0, //滚动距离
      clientDistances: [], //每个分类的高度
      food: {}
    };
  },
  mounted() {
    this.$store.dispatch('req_shop_goods', () => {
      this.$nextTick(() => {
        this._initScrollY();
        this.collectionClientDistance();
      });
    });
  },
  methods: {
    // 收集每个分类的高度
    collectionClientDistance() {
      let foodList = this.$refs.foodList.children;
      // 定义当前li高度
      let currentClientHeight = 0;
      this.clientDistances.push(currentClientHeight);
      [...foodList].forEach((food) => {
        currentClientHeight += food.clientHeight;
        this.clientDistances.push(currentClientHeight);
      });
    },
    // 初始化滑动高度
    _initScrollY() {
      this.menuScroll = new BetterScroll('.menu-wrapper', {
        scrollY: true, //开启纵向滚动
        probeType: 2, //开启事件监听模式,
        click: true
      });
      this.foodsScroll = new BetterScroll('.foods-wrapper', {
        scrollY: true, //开启纵向滚动
        probeType: 2, //开启事件监听模式
        click: true
      });
      this.foodsScroll.on('scroll', ({ y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    // 点击跳转
    toScroll(index) {
      this.scrollY = this.clientDistances[index];
      this.foodsScroll.scrollTo(0, -this.clientDistances[index], 300);
    },
    // 显示食物大图卡片
    showFoodCard(food) {
      this.food = food;
      this.$refs.FoodCard.showFoodCard();
    }
  },
  computed: {
    ...mapState(['goods']),
    //当前点击的索引
    currentIndex() {
      return this.clientDistances.findIndex((item, index) => {
        if (
          this.scrollY >= item &&
          this.scrollY < this.clientDistances[index + 1]
        )
          return true;
      });
    }
  },
  components: {
    CartControl,
    FoodCard,
    ShopCart
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
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

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
