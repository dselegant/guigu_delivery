<template>
  <div class="shop_container">
    <ul class="shop_list">
      <li class="shop_li border-1px" v-for="shop in shops" :key="shop.id">
        <a href="/shop">
          <div class="shop_left">
            <img class="shop_img" src="@/assets/images/shop/1.jpg" />
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{ shop.name }}</h4>
              <ul class="shop_detail_ul">
                <li
                  class="supports"
                  v-for="support in shop.supports"
                  :key="support.id"
                >
                  {{ support.icon_name }}
                </li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <Star :rating="shop.rating" :size="24"></Star>
                <div class="rating_section">{{ shop.rating }}</div>
                <div class="order_section">
                  月售{{ shop.recent_order_num }}单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">{{
                  shop.delivery_mode.text
                }}</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥{{ shop.float_minimum_order_amount }}起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥{{ shop.float_delivery_fee }}</span>
              </p>
            </section>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Star from '../Star/Star';
export default {
  computed: {
    ...mapState(['shops'])
  },
  components: {
    Star
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" >
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
  background-image: url($url + '@3x.png');
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

.shop_container {
  margin-bottom: 50px;

  .shop_list {
    .shop_li {
      bottom-border-1px(#f1f1f1);
      width: 100%;

      >a {
        clearFix();
        display: block;
        box-sizing: border-box;
        padding: 15px 8px;
        width: 100%;

        .shop_left {
          float: left;
          box-sizing: border-box;
          width: 23%;
          height: 75px;
          padding-right: 10px;

          .shop_img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .shop_right {
          float: right;
          width: 77%;

          .shop_detail_header {
            clearFix();
            width: 100%;

            .shop_title {
              float: left;
              width: 200px;
              color: #333;
              font-size: 16px;
              line-height: 16px;
              font-weight: 700;

              &::before {
                content: '品牌';
                display: inline-block;
                font-size: 11px;
                line-height: 11px;
                color: #333;
                background-color: #ffd930;
                padding: 2px 2px;
                border-radius: 2px;
                margin-right: 5px;
              }
            }

            .shop_detail_ul {
              float: right;
              margin-top: 3px;

              .supports {
                float: left;
                font-size: 10px;
                color: #999;
                border: 1px solid #f1f1f1;
                padding: 0 2px;
                border-radius: 2px;
              }
            }
          }

          .shop_rating_order {
            clearFix();
            width: 100%;
            margin-top: 18px;
            margin-bottom: 8px;

            .shop_rating_order_left {
              float: left;
              color: #ff9a0d;

              .rating_section {
                float: left;
                font-size: 10px;
                color: #ff6000;
                margin-left: 4px;
              }

              .order_section {
                float: left;
                font-size: 10px;
                color: #666;
                transform: scale(0.8);
              }
            }

            .shop_rating_order_right {
              float: right;
              font-size: 0;

              .delivery_style {
                transform-origin: 35px 0;
                transform: scale(0.7);
                display: inline-block;
                font-size: 12px;
                padding: 1px;
                border-radius: 2px;
              }

              .delivery_left {
                color: #fff;
                margin-right: -10px;
                background-color: #02a774;
                border: 1px solid #02a774;
              }

              .delivery_right {
                color: #02a774;
                border: 1px solid #02a774;
              }
            }
          }

          .shop_distance {
            clearFix();
            width: 100%;
            font-size: 12px;

            .shop_delivery_msg {
              float: left;
              transform-origin: 0;
              transform: scale(0.9);
              color: #666;
            }

            .segmentation {
              color: #ccc;
            }
          }
        }
      }
    }
  }
}

.star { // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star48_on');
      }

      &.half {
        bg-image('./images/star48_half');
      }

      &.off {
        bg-image('./images/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star36_on');
      }

      &.half {
        bg-image('./images/star36_half');
      }

      &.off {
        bg-image('./images/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star24_on');
      }

      &.half {
        bg-image('./images/star24_half');
      }

      &.off {
        bg-image('./images/star24_off');
      }
    }
  }
}
</style>