import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import VueCompositionApi from '@vue/composition-api'
import vuetify from './vuetify'
import "./plugins/axios"
import "./mixins/global.mixin";
Vue.use(VueCompositionApi)

Vue.use(vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app')
