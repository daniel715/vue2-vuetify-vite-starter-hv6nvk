<template>
  <div
    class="d-flex text-center flex-column flex-md-row flex-grow-1"
    :style="{
      backgroundSize: 'cover',
      // backgroundImage: `url(${image})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="select"
            :messages="message"
            label="Buscar"
            outlined
            dense
            @keydown.enter="buscar"
            @change="input"
            hide-selected
            hide-no-data
          ></v-text-field>
          <div style="min-height: 4px">
            <v-progress-linear :active="loading" :indeterminate="loading" color="blue accent-4"></v-progress-linear>
          </div>
          <div>Buscar por Categoria</div>
          <v-chip-group active-class="primary--text">
            <v-chip @click="buscarLibrosPorCategoria(categoria.id)" v-for="categoria in categorias" :key="categoria.id">
              {{ categoria.nombre }}
            </v-chip>
          </v-chip-group>
          <div class="mt-5">
            <visor-libro v-if="success" :items="items" ref="visorlibro" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
<script>
import { ref, defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import VisorLibro from '@/components/VisorLibro.vue'
export default defineComponent({
  components: {
    VisorLibro,
  },
  data: () => ({
    select: [],
    loading: false,
    success: false,
    items: [],
    param: '',
    response: [],
    categorias: [],
  }),

  methods: {
    async buscar() {
      this.loading = true
      this.select = this.param
      console.log('buscando', this.select)
      this.response = await this.$axios.get('/libro/buscar/' + this.select)
      if (this.response.status == '200') this.success = true
      this.items = this.parseImagesArrayToJson(this.response)
      setTimeout(() => {
        this.$refs.visorlibro.items = this.items
      }, 500)
      this.loading = false
    },
    input(data) {
      this.param = data
    },
    parseImagesArrayToJson(response) {
      console.log('response', response)
      let salida = []
      response.data.forEach((item) => {
        let objeto = {}
        for (let prop in item) {
          if (prop == 'imageurl') objeto[prop] = JSON.parse(item[prop])
          else objeto[prop] = item[prop]
        }
        salida.push(objeto)
      })
      return this.deleteDuplicateRecords(salida)
    },
    deleteDuplicateRecords(arr) {
      const seen = new Set()
      const filteredArr = arr.filter((el) => {
        const duplicate = seen.has(el.id)
        seen.add(el.id)
        return !duplicate
      })
      console.log(filteredArr)
      return filteredArr
    },
    async getCategorias() {
      let response = await this.$axios.get('categoria/list')
      this.categorias = response.data
      console.log(response)
    },
    async buscarLibrosPorCategoria(data) {
      this.response = await this.$axios.get('/libro/buscarporcategoria/' + data)
      if (this.response.status == '200') this.success = true
      this.items = this.parseImagesArrayToJson(this.response)
      setTimeout(() => {
        this.$refs.visorlibro.items = this.items
      }, 500)
      this.loading = false
    },
  },
  computed: {
    ...mapState(['isMobile']),

    image() {
      return this.isMobile
        ? '/fondo-login.jpg'
        : 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80'
    },
    message() {
      if (this.param) return 'Resultados de busqueda para: ' + this.param
      else return ''
    },
  },
  setup() {
    const count = ref(0)
    return { count }
  },
  created() {
    this.getCategorias()
  },
})
</script>
  
  