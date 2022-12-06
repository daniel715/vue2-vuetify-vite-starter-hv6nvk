import Vue from 'vue'
import Vuetify from 'vuetify'

import * as directives from 'vuetify/lib/directives'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify, {
    directives
  })

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
  }
})