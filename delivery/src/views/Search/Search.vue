<template>
  <section class="search">
    <HeaderTop title="搜索"></HeaderTop>
    <form class="search_form" @submit.prevent="handlerSearchShop">
      <input
        type="search"
        placeholder="请输入商家名称"
        class="search_input"
        v-model="keyword"
      />
      <input type="submit" class="search_submit" />
    </form>
    <section class="list">
      <ul class="list_container">
        <li class="list_li" v-for="(item, index) in searchShop" :key="index">
          <section class="item_left">
            <img
              :src="`http://cangdu.org:8001/img/${item.image_path}`"
              class="restaurant_img"
            />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ item.name }}</span>
              </p>
              <p>月售 {{ item.recent_order_num }} 单</p>
              <p>20 元起送 / 距离 {{ item.distance }}</p>
            </div>
          </section>
        </li>
      </ul>
    </section>
    <div class="search_none">很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import HeaderTop from '../../components/Msite/HeaderTop.vue';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      keyword: ''
    };
  },
  methods: {
    handlerSearchShop() {
      let { keyword } = this;
      this.$store.dispatch('reqSearchShop', keyword);
    }
  },
  computed: {
    ...mapState(['searchShop'])
  },
  components: {
    HeaderTop
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
.search {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .search_form {
    clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }

      &.search_submit {
        float: right;
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
    }
  }

  .list {
    .list_container {
      background-color: #fff;

      .list_li {
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid $bc;

        .item_left {
          margin-right: 10px;

          .restaurant_img {
            width: 50px;
            height: 50px;
            display: block;
          }
        }

        .item_right {
          font-size: 12px;
          flex: 1;

          .item_right_text {
            p {
              line-height: 12px;
              margin-bottom: 6px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .search_none {
    margin: 0 auto;
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }
}
</style>