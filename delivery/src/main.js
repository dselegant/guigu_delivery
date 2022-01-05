import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import './mock/mockServer'// 加载mockServer即可
import loading from '@/assets/images/loading.gif'
import VueLazyload from 'vue-lazyload'

Vue.use(Vant);
Vue.use(VueLazyload, {

  loading
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
