import Vue from 'vue'
import Vuex from 'vuex'
import { reqAddress, reqFoodCategories, reqShops, reqUserInfo, reqLogout, reqShopInfo, reqShopGoods, reqShopRatings, reqSearchShop } from '../api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, //地址相关信息对象
    categorys: [], // 食品分类数组
    shops: [], // 商家数组,
    user: '',//用户信息,
    shopInfo: {},//商家信息
    goods: [],//食物列表
    cartFoods: [], // 购物车中食物的列表
    ratings: [], //店铺评价列表
    searchShop: [] //搜索的商家数组
  },
  actions: {
    //获取地址
    async get_address(context) {
      let geohash = context.state.latitude + ',' + context.state.longitude
      let ret = await reqAddress(geohash)
      if (ret.code === 0) {
        context.commit('RECIVE_ADDRESS', ret.data)
      }
    },
    // 获取食物分类列表
    async get_food_categories(context) {
      let ret = await reqFoodCategories()
      if (ret.code === 0) {
        context.commit('RECEIVE_CATEGORYS', ret.data)
      }
    },
    // 获取商家列表
    async get_shops(context) {
      let ret = await reqShops()
      if (ret.code === 0) context.commit('RECEIVE_SHOPS', ret.data)

    },
    // 获取用户信息
    async get_user(context) {
      let ret = await reqUserInfo()
      if (ret.code === 0) context.commit('RECEIVE_USER', ret.data)
    },
    // 退出登录
    async req_logout(context) {
      let ret = await reqLogout()
      if (ret.code === 0) context.commit('LOGOUT')
    },
    // 获取商家信息
    async req_shop_info(context) {
      let ret = await reqShopInfo()
      if (ret.code === 0) context.commit('REQSHOPINFO', ret.data)
    },
    // 获取食物信息
    async req_shop_goods(context, callback) {
      let ret = await reqShopGoods()
      if (ret.code === 0) context.commit('REQSHOPGOODS', ret.data)
      callback()
    },
    // 更新购物车数量
    update_food_count(context, { isAdd, food }) {
      if (isAdd) {
        if (!food.count) {
          Vue.set(food, 'count', 1)
        } else {
          food.count += 1
        }
      } else {
        if (food.count) food.count -= 1;
      }
      context.commit('ADDCARTFOODS', food)

    },
    // 请求店铺评价列表
    async req_shop_ratings(context, callback) {
      let ret = await reqShopRatings();
      // console.log(ret);
      if (ret.code === 0) {
        context.commit('REQSHOPRATINGS', ret.data)
        callback();
      }
    },
    // 搜索
    async reqSearchShop(context, keyword) {
      let geohash = context.state.latitude + ',' + context.state.longitude
      let ret = await reqSearchShop(keyword, geohash);
      if (ret.code === 0) {
        context.commit('REQSHOPSEARCH', ret.data)
      }
    }
  },
  mutations: {
    // 添加地址
    RECIVE_ADDRESS(state, value) {
      state.address = value
    },
    // 添加食物分类列表
    RECEIVE_CATEGORYS(state, value) {
      state.categorys = value
    },
    // 添加商家列表
    RECEIVE_SHOPS(state, value) {
      state.shops = value
    },
    // 添加用户信息
    RECEIVE_USER(state, value) {
      state.user = value
    },
    // 退出登录状态
    LOGOUT(state) {
      state.user = ''
    },
    // 添加商家信息
    REQSHOPINFO(state, value) {
      state.shopInfo = value;
    },
    // 添加食物列表
    REQSHOPGOODS(state, value) {
      state.goods = value;
    },
    // 添加购物车列表
    ADDCARTFOODS({ cartFoods }, food) {
      if (cartFoods.indexOf(food) >= 0) {
        cartFoods[cartFoods.indexOf(food)] = food
      } else {
        cartFoods.push(food);
      }
      // 如果数量为0则删除
      if (food.count === 0) {
        cartFoods.splice(cartFoods.indexOf(food), 1)
      }
    },
    //添加店铺评价信息
    REQSHOPRATINGS(state, value) {
      state.ratings = value;
    },
    // 清空购物车信息
    EMPTYCART(state, value) {
      state.cartFoods.forEach(item => {
        item.count = 0
      })
      state.cartFoods = [];

    },
    // 添加店铺搜索数据
    REQSHOPSEARCH(state, value) {
      state.searchShop = value
    }
  },
  getters: {
    // 商品分类数组优化
    categories_arr(state) {
      let arr = []
      let minArr = []
      state.categorys.forEach((item) => {
        if (minArr.length == 0) {
          arr.push(minArr)
        }
        minArr.push(item)
        if (minArr.length == 8) {
          minArr = []
        }
      })
      return arr;
    },
    // 总价格
    totalPrice(state) {
      let totalPrice = 0;
      // 商品费
      state.cartFoods.forEach((item) => {
        totalPrice += item.price * item.count
      })
      return totalPrice
    },
    // 总价格
    totalNum(state) {
      let totalNum = 0;
      state.cartFoods.forEach((item) => {
        totalNum += item.count
      })
      return totalNum;
    },
    // 满意评价数
    positiveSize(state) {
      return state.ratings.filter((item, index) => {
        return item.rateType == 0
      }).length
    }
  },
  modules: {
  }
})
