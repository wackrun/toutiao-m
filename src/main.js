import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Vant组件库
import Vant from 'vant'
// 导入Vant全局样式
import 'vant/lib/index.css'

// 加载全局样式
import './styles/index.less'
// 注册使用Vant组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
