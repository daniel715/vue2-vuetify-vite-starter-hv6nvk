<template>
  <v-app id="app">
    <component :is="currentLayout">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </component>

    <!-- <div class="snackbar-wrapper">
      <v-snackbar
        v-model="toast.show"
        :timeout="toast.timeout"
        :color="toast.color"
        :right="toast.right"
        bottom
        :style="`${isMobile ? 'transform:translateY(-45px)' : ''}`"
      >
        {{ toast.message }}
        <v-btn
          v-if="toast.timeout === 0"
          color="white"
          text
          @click="toast.show = false"
          >{{ $t("common.close") }}</v-btn
        >
      </v-snackbar>
    </div> -->

  </v-app>
</template>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import index from "./views/Index.vue"
import admin from "./views/Admin.vue"

export default defineComponent ({
  name: 'App',
  components: {
    index,
    admin
  },
  computed:{
    currentLayout(){
      const route = this.$route.meta.layout;
      return route;
    }
  },
  created(){
    console.log("route", this.$route.meta.layout);
  }
})
</script>

<style scoped>
/**
 * Transition animation between pages
 */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
