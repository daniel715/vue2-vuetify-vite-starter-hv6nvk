<template>
  <v-card>
    <v-toolbar color="cyan" dark flat>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card v-if="item == 'Libros'" flat>
          <libro-crud />
        </v-card>
        <v-card v-else-if="item == 'Autores'">
          <autor-crud />
        </v-card>
        <v-card v-else-if="item == 'Categorias'"> <categoriaCrud /> </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import { ref, defineComponent } from '@vue/composition-api'
import basicCrud from '@/components/BasicCrud.vue'
import autorCrud from '@/components/Cruds/AutorCrud.vue'
import libroCrud from './Cruds/LibroCrud.vue'
import categoriaCrud from '@/components/Cruds/CategoriaCrud.vue'
export default defineComponent({
  components: {
    basicCrud,
    autorCrud,
    libroCrud,
    categoriaCrud,
  },
  data: () => ({
    tab: null,
    items: ['Libros', 'Autores', 'Categorias'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
  methods: {},
})
</script>