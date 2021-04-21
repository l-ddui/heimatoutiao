import Vue from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/styles/reset.less'

// 引入路由模块
import router from '@/router/index'

// 引入 toast
import { Toast, Icon, Uploader, Dialog, Field } from 'vant';
Vue.use(Toast)
  .use(Icon)
  .use(Dialog)
  .use(Field)
  .use(Uploader);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
