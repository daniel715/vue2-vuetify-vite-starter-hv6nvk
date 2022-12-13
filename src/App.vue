<template>
  <v-app id="app">
    <transition name="fade" mode="out-in" >
      <component :is="currentLayout" v-if="isRouterLoaded"> </component>
    </transition>
  </v-app>
</template>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import index from './views/Index.vue'
import admin from './views/Admin.vue'

export default defineComponent({
  name: 'App',
  data:() => ({
    isRouterLoaded:false
  }),
  components: {
    index,
    admin,
  },
  computed: {
    currentLayout() {
      const route = this.$route.meta.layout
      return route
    },
  },
  created() {
    console.log('route', this.$route.meta.layout)
    setTimeout(() => {
      this.isRouterLoaded = true;
    }, 500);
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
