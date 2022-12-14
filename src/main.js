import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import VueCompositionApi from '@vue/composition-api'
import vuetify from './vuetify'
import "./plugins/axios"
import "./mixins/global.mixin";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueCompositionApi)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
