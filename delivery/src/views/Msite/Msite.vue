<template>
  <!-- <div class="on"> -->
  <section class="msite">
    <HeaderTop :title="address.name">
      <template v-slot:left>
        <span class="header_search">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </template>
      <template v-slot:right>
        <span class="header_login">
          <span class="header_login_text" v-if="!user._id"> 登录|注册 </span>
          <span class="header_login_text" v-else>
            <i class="iconfont icon-person"></i>
          </span>
        </span>
      </template>
    </HeaderTop>

    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
            <van-swipe-item
              v-for="(categories, index) in categories_arr"
              :key="index"
            >
              <div class="swiper-slide">
                <a
                  href="javascript:"
                  class="link_to_food"
                  v-for="category in categories"
                  :key="category.id"
                >
                  <div class="food_container">
                    <img :src="baseImageUrl + category.image_url" />
                  </div>
                  <span>{{ category.title }}</span>
                </a>
              </div></van-swipe-item
            >
          </van-swipe>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
  <!-- </div> -->
</template>

<script>
import HeaderTop from '../../components/Msite/HeaderTop';
import ShopList from '../../components/Msite/ShopList';
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    };
  },
  components: {
    HeaderTop,
    ShopList
  },
  mounted() {
    this.get_address();
    this.get_food_categories();
    this.get_shops();
  },
  methods: {
    ...mapActions(['get_address', 'get_food_categories', 'get_shops'])
  },
  computed: {
    ...mapState(['address', 'user']),
    ...mapGetters(['categories_arr'])
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

.msite_nav {
  bottom-border-1px(#e4e4e4);
  margin-top: 45px;
  height: 200px;
  background: #fff;

  .swiper-container {
    width: 100%;
    height: 100%;

    .swiper-wrapper {
      width: 100%;
      height: 100%;

      .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;

        .link_to_food {
          width: 25%;

          .food_container {
            display: block;
            width: 100%;
            text-align: center;
            padding-bottom: 10px;
            font-size: 0;

            img {
              display: inline-block;
              width: 50px;
              height: 50px;
            }
          }

          span {
            display: block;
            width: 100%;
            text-align: center;
            font-size: 13px;
            color: #666;
          }
        }
      }
    }

    .swiper-pagination {
      >span.swiper-pagination-bullet-active {
        background: #02a774;
      }
    }
  }
}
</style>
