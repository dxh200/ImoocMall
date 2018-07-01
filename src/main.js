// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from "vue-lazyload"
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './utils/currency'

Vue.use(VueLazyLoad,{
  loading:"/static/loading-svg/loading-spin.svg"
})

Vue.filter('currency',currency)

Vue.use(infiniteScroll)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
