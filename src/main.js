import Vue from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/styles/reset.less'

// 引入路由模块
import router from '@/router/index'

// 引入 toast
import { Toast, Icon, Uploader, Dialog, Field, ActionSheet, Tab, Tabs, List, PullRefresh } from 'vant';
Vue.use(Toast)
  .use(Icon)
  .use(Dialog)
  .use(Field)
  .use(Tab)
  .use(Tabs)
  .use(ActionSheet)
  .use(List)
  .use(Uploader)
  .use(PullRefresh)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
